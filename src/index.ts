require("module-alias/register");

import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// Setup
dotenv.config();

// Routes
import routes from "@routes";

const app: Express = express();

const allowedDomains = process.env.ORIGIN_ADDRESS
    ? process.env.ORIGIN_ADDRESS.split(" ")
    : ["http://localhost:3000", `http://localhost:8000`];

// Add-ons
app.use(morgan("dev"));
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (allowedDomains.indexOf(origin) === -1) {
                const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;

                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

app.listen(process.env.PORT || 9002);
