import { PoolConnection } from "mysql2";

export type MysqlCallback = (
    err: NodeJS.ErrnoException | null,
    connection?: PoolConnection
) => any;

export interface QueryRequest {
    [key: string]:
        | undefined
        | string
        | string[]
        | QueryRequest
        | QueryRequest[];
}

export interface MysqlQueryOptions {
    request?: QueryRequest;
    items?: string | string[];
    table: string;
    isBinary?: boolean;
}

export interface GeneratedMysqlQuery {
    text: string;
    parameters: (string | number)[];
}
