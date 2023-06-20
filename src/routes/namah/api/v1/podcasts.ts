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
                request: req.query,
                table: "podcasts",
            })
                .then((result) => {
                    if (result.length === 0) {
                        res.status(404).json({
                            wasSuccessful: false,
                            description: "No podcasts found",
                        });
                    } else {
                        res.status(200).json({
                            wasSuccessful: true,
                            podcasts: translateObjectListKeys(result),
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
