require("module-alias/register");

import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

// Setup
dotenv.config();

// Routes
import routes from "@routes";

const app: Express = express();

const dbURI = `mongodb://${
    process.env.DATABASE_HOST.trim().length > 0 &&
    process.env.DATABASE_PORT.trim().length > 0 &&
    process.env.DATABASE_TABLE.trim().length > 0
        ? `${process.env.DATABASE_HOST.trim()}:${process.env.DATABASE_PORT.trim()}/${process.env.DATABASE_TABLE.trim()}`
        : "127.0.0.1:27017/karikariyaki"
}`;

mongoose.connect(dbURI, {
    minPoolSize: Number(process.env.DATABASE_MIN_POOL_SIZE) ?? 5,
    maxPoolSize: Number(process.env.DATABASE_MAX_POOL_SIZE) ?? 15,
});

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

app.listen(process.env.PORT || 9010);
