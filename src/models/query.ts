import { Connection } from "mysql2";

// Types
import { MysqlQueryOptions, GeneratedMysqlQuery } from "@typing";

// Services
import { generateQuery } from "@services";

export const execQuery = async (
    connection: Connection,
    options: MysqlQueryOptions
) => {
    const generatedQuery: GeneratedMysqlQuery = generateQuery(options);

    return new Promise<any>((resolve, reject) => {
        connection.query(
            generatedQuery.text,
            generatedQuery.parameters,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};
