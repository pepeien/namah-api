import { UserModel } from "@models";
import { Router } from "express";
import { sign } from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const result = await UserModel.find({
            email: req.body.email,
            password: req.body.password,
        });

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

        const userName = result[0].name;

        const access_token = sign({ userName }, process.env.SECRET, {
            expiresIn: 600,
        });

        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({
            wasSuccessful: true,
            loggedUser: userName,
        });
    } catch (error) {
        res.status(500).json({
            wasSuccessful: false,
            description: "Server error, please try again",
        });
    }
});

export default router;
