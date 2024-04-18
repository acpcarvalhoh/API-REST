import  knex from "knex";
import { Knex }from "knex";
import "dotenv/config"
import { env } from "../env";


export const config: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection: env.DATABASE_CLIENT === "sqlite" ? {
        filename: env.DATABASE_URL
    }: env.DATABASE_URL,
    
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory: "./tmp/migrations"
    },
};

export const db = knex(config);





