import fastify from "fastify";
import { db } from "./database/conection";
import crypto from "node:crypto"
import { env } from "../env";

const app = fastify();


app.get("/users", async () => {
    const transactions = await db("transactions").insert({
        id: crypto.randomUUID(),
        title: "Trasação de teste",
        amount: 1000
    });

    return transactions;
});


app.listen({
    port: env.PORT
}).then(() => {
    console.log(`Aplication running on port ${env.PORT}`);
});