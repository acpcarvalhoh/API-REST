import knex from "knex";
import path from "path";

export const config = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, "..", "..", "tmp", "database.db")
    },
    useNullAsDefault: true,
    
};

export const conection = knex(config);




