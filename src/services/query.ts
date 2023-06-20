// Types
import { GeneratedMysqlQuery, MysqlQueryOptions } from "../types";

export const generateQuery = ({
    request,
    items,
    table,
    isBinary,
}: MysqlQueryOptions): GeneratedMysqlQuery => {
    isBinary = isBinary === null || isBinary === undefined ? false : isBinary;
    request = request ?? {};

    const queryParameters: (string | number)[] = [];

    let queryClauses = `SELECT ${
        items === "" || items === null || items === undefined ? "*" : items
    } FROM ${table}`;

    let result: GeneratedMysqlQuery = {
        text: queryClauses,
        parameters: [],
    };

    if (!request || Object.keys(request).length == 0) {
        return result;
    }

    const validItem = Object.keys(request).find(
        (element) =>
            element !== "limit" && request && request[element] !== undefined
    );

    if (validItem) {
        const firstIndex = Object.keys(request).indexOf(validItem);

        Object.keys(request).map((element, index) => {
            if (element === "q" && items) {
                for (const [targetItemKey, targetItemValue] of Object.entries(
                    items
                )) {
                    if (targetItemKey === "0") {
                        queryClauses =
                            queryClauses +
                            ` WHERE ${targetItemValue} LIKE CONCAT('%', ?, '%')`;
                    } else {
                        queryClauses =
                            queryClauses +
                            ` OR ${targetItemValue} LIKE CONCAT('%', ?, '%')`;
                    }

                    if (request && request[element]) {
                        queryParameters.push(request[element] as string);
                    }
                }
            } else {
                if (
                    element !== "limit" &&
                    request &&
                    request[element] !== undefined
                ) {
                    if (index === firstIndex) {
                        queryClauses =
                            queryClauses +
                            ` WHERE ${table.slice(0, -1)}_${element} LIKE ${
                                isBinary ? "BINARY " : ""
                            }?`;
                    } else {
                        queryClauses =
                            queryClauses +
                            ` AND ${table.slice(0, -1)}_${element} LIKE ${
                                isBinary ? "BINARY " : ""
                            }?`;
                    }

                    if (request && request[element]) {
                        queryParameters.push(request[element] as string);
                    }
                }
            }
        });
    }

    queryClauses = queryClauses + ` LIMIT ?`;

    if (!request["limit"] || parseInt(request["limit"] as string) < 1) {
        queryParameters.push(10);
    } else {
        queryParameters.push(parseInt(request["limit"] as string));
    }

    result.text = queryClauses;
    result.parameters = queryParameters;

    return result;
};
