import { RequestHandler, Router } from "express";
import { sign, verify, VerifyErrors } from "jsonwebtoken";

//Models
import { getConnection, execQuery } from "@models";

const router = Router();

const verifyJWT: RequestHandler = (req: any, res, next) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        return res.status(403).json({
            wasSuccessful: false,
            description: "No access_token provided",
        });
    }

    if (!process.env.SECRET) {
        return res.status(503).json({
            wasSuccessful: false,
            description: "No secret provided",
        });
    }

    verify(
        access_token,
        process.env.SECRET,
        (err: VerifyErrors | null, decoded: any) => {
            if (err || !decoded) {
                return res.status(500).json({
                    wasSuccessful: false,
                    description: "Failed to authenticate access_token",
                });
            }

            req.user_id = decoded.user_id as string;

            next();
        }
    );
};

router.get("/", (req, res) => {
    res.status(405).json({
        wasSuccessful: false,
        description: "Invalid method, please use POST",
    });
});

router.post("/", (req, res) => {
    const validOriginList = process.env.ORIGIN_ADDRESS.split(" ");

    getConnection(async (error, connection) => {
        if (!error && connection) {
            await execQuery(connection, {
                request: {
                    email: req.body.email,
                    password: req.body.password,
                },
                items: "user_name",
                table: "users",
                isBinary: true,
            })
                .then((result) => {
                    if (result.length === 0) {
                        res.status(401).json({
                            wasSuccessful: false,
                            description: "Invalid username or password",
                        });

                        return;
                    }

                    if (!process.env.SECRET) {
                        res.status(5403).json({
                            wasSuccessful: false,
                            description: "Secret not provided",
                        });

                        return;
                    }

                    const userName = result[0].user_name;

                    if (
                        !validOriginList.find(
                            (currentOrigin) =>
                                currentOrigin === req.headers.origin
                        )
                    ) {
                        const access_token = sign(
                            { userName },
                            process.env.SECRET,
                            {
                                expiresIn: 600,
                            }
                        );

                        res.cookie("access_token", access_token, {
                            httpOnly: true,
                            secure: true,
                        });
                    }

                    res.status(200).json({
                        wasSuccessful: true,
                        loggedUser: userName,
                    });
                })
                .catch(() => {
                    res.status(500).json({
                        wasSuccessful: false,
                        description: "Server error, please try again",
                    });
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
