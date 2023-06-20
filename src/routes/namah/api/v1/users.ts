import { Router } from "express";

//Models
import { getConnection, execQuery } from "@models";

//Services
import { translateObjectListKeys } from "@services";

const router = Router();

router.get("/", (req, res) => {
    getConnection(async (error, connection) => {
        if (!error && connection) {
            await execQuery(connection, {
                request: {
                    name: req.query.name,
                    id: req.query.id,
                },
                items: "user_id,user_name",
                table: "users",
            })
                .then((result) => {
                    if (result.length === 0) {
                        res.status(404).json({
                            wasSuccessful: false,
                            description: "No users found",
                        });
                    } else {
                        res.status(200).json({
                            wasSuccessful: true,
                            users: translateObjectListKeys(result),
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
                            description: "Server error, please try again",
                        });
                    }
                });

            connection.release();
        } else {
            res.status(500).json({
                wasSuccessful: false,
                description: "Server error, please try again",
            });
        }
    });
});

export default router;
