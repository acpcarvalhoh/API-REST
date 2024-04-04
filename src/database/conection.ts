import  knex from "knex";
import { Knex }from "knex";


export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: "./tmp/database.db"
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory: "./tmp/migrations"
    },
};

export const db = knex(config);





