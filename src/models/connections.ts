import { createPool } from "mysql2";

// Types
import { MysqlCallback } from "../types";

const pool = createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

export const getConnection = async (cb: MysqlCallback) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return cb(error);
        }

        cb(null, connection);
    });
};
