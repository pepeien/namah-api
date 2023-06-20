import { Router } from "express";

// Models
import { getConnection, execQuery } from "@models";

// Services
import {
    toCamelCase,
    translateObjectListKeys,
    orderObjectByKey,
} from "@services";

const router = Router();

const getTableInfo = (currentTable: string) => {
    return new Promise<() => string[]>((resolve, reject) => {
        try {
            getConnection((error, connection) => {
                if (error || !connection) {
                    reject(null);

                    return;
                }

                connection.query(
                    `DESCRIBE ${currentTable}`,
                    (error, result) => {
                        if (!error && result) {
                            resolve(() => {
                                const tableParams: string[] = [];

                                for (const value of Object.values(result)) {
                                    const splittedParam =
                                            value.Field.split("_"),
                                        excludeParamsList = [
                                            "password",
                                            "email",
                                            "currency",
                                            "price",
                                            "date",
                                        ];

                                    if (
                                        !excludeParamsList.find(
                                            (element) =>
                                                element ===
                                                splittedParam[
                                                    splittedParam.length - 1
                                                ]
                                        )
                                    ) {
                                        tableParams.push(value.Field);
                                    }
                                }

                                return tableParams;
                            });
                        }
                    }
                );

                connection.release();
            });
        } catch (error) {
            reject(error);
        }
    });
};

router.get("/", async (req, res) => {
    const avaiableTables = [
        "courses",
        "podcasts",
        "posts",
        "products",
        "users",
    ];
    let searchResult = {};

    if (req.query.q) {
        for (const currentTable of avaiableTables) {
            getTableInfo(currentTable)
                .then((callback) => callback())
                .then((tableParams) => {
                    getConnection(async (error, connection) => {
                        if (error || !connection || !tableParams) {
                            res.status(500).json({
                                wasSuccessful: false,
                                description: "Server error, please try again",
                            });
                        }

                        await execQuery(connection, {
                            request: {
                                q: req.query.q,
                                limit: req.query.limit,
                            },
                            items: tableParams,
                            table: currentTable,
                        })
                            .then((result) => {
                                searchResult = {
                                    ...searchResult,
                                    [toCamelCase(currentTable)]:
                                        translateObjectListKeys(result),
                                };

                                if (
                                    Object.keys(searchResult).length ===
                                    avaiableTables.length
                                ) {
                                    res.status(200).json({
                                        wasSuccessful: true,
                                        searchResult:
                                            orderObjectByKey(searchResult),
                                    });
                                }
                            })
                            .catch((error) => {
                                if (error.code === "ER_BAD_FIELD_ERROR") {
                                    res.status(500).json({
                                        wasSuccessful: false,
                                        description: "Invalid query parameter",
                                    });
                                } else {
                                    res.status(500).json({
                                        wasSuccessful: false,
                                        description:
                                            "Server error, please try again",
                                    });
                                }
                            });

                        connection.release();
                    });
                })
                .catch(() => {
                    res.status(500).json({
                        wasSuccessful: false,
                        description: "Server error, please try again",
                    });
                });
        }
    } else {
        res.status(200).json({
            wasSuccessful: false,
            description: "Invalid or missing search value",
        });
    }
});

export default router;
