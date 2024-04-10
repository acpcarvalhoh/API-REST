import { FastifyInstance } from "fastify";
import { db } from "../src/database/conection";
import { z } from "zod";

export async function transactionsRoutes(app: FastifyInstance){
    app.post("/", async (request, replay) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amout: z.number(),
            type: z.enum(["credit", "debit"])
        });

        const { title, amout, type } = createTransactionBodySchema.parse(request.body);


        const transactions = await db("transactions").insert({
            id: crypto.randomUUID(),
            title,
            amout: type === "credit" ? amout : amout * -1          
        });
    
        return replay.status(201).send();
    });
};


