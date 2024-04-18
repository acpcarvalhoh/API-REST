import { env } from "./env";
import { app } from "./app";

app.listen({
    port: env.PORT
}).then(() => {
    console.log(`Aplication running on port ${env.PORT}`);
});