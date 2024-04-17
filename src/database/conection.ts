import  knex from "knex";
import { Knex }from "knex";
import "dotenv/config"
import { env } from "../env";


export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory: "./tmp/migrations"
    },
};

export const db = knex(config);





