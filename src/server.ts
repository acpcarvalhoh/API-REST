import fastify from "fastify";
import { env } from "../env";
import { transactionsRoutes } from "./routes/transactions.routes";
import cookie from "@fastify/cookie";

const app = fastify();
app.register(cookie);

app.register(transactionsRoutes, {
    prefix: 'transactions',
});

app.listen({
    port: env.PORT
}).then(() => {
    console.log(`Aplication running on port ${env.PORT}`);
});