import fastify from "fastify";
import { conection } from "./database/conection";


const app = fastify();

const PORT = 3333;

app.get("/users", async () => {
    const tables = await conection("sqlite_schema").select("*");

    return tables;
});


app.listen({
    port: PORT
}).then(() => {
    console.log(`Aplication running on port ${PORT}`);
});