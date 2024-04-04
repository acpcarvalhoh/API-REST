import fastify from "fastify";
import { db } from "./database/conection";
import crypto from "node:crypto"

const app = fastify();

const PORT = 3333;

app.get("/users", async () => {
    const transactions = await db("transactions").insert({
        id: crypto.randomUUID(),
        title: "Trasação de teste",
        amount: 1000
    });

    return transactions;
});


app.listen({
    port: PORT
}).then(() => {
    console.log(`Aplication running on port ${PORT}`);
});