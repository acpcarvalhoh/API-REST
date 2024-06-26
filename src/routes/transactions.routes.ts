import { FastifyInstance } from "fastify";
import { db } from "../database/conection";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkSessionsId } from "../middlewares/checkSessionsId";

export async function transactionsRoutes(app: FastifyInstance){

    app.get("/", 
    {
        preHandler: [checkSessionsId]
    }, 
    async (request, replay) => {
        const sessions_id = request.cookies.sessionsId;
        
        const transactions = await db("transactions").where("sessions_id", sessions_id).select();

        return { transactions };
    });

    app.get("/:id", 
    {
        preHandler: [checkSessionsId]
    }, 
    async (request, replay) => {
        
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid()
        });

        const { id } = getTransactionParamsSchema.parse(request.params)
        const { sessionsId }= request.cookies;

        const transaction = await db("transactions").where({
            id, 
            sessions_id: sessionsId
        }).first()

        return { transaction };
    });

    app.get("/sumary", 
    {
        preHandler: [checkSessionsId]
    }, 
    async (request, replay) => {
        const { sessionsId }= request.cookies;
        const sumary = await db("transactions").where("sessions_id", sessionsId).sum("amount", {as: "amount"}).first()

        return { sumary };
    });



    app.post("/", async (request, replay) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(["credit", "debit"])
        });

        const { title, amount, type } = createTransactionBodySchema.parse(request.body);


        let sessionsId = request.cookies.sessionsId;
        if(!sessionsId){
            sessionsId = randomUUID();


            replay.setCookie("sessionsId", sessionsId, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7 // 7 days
            });

    
        };

        await db("transactions").insert({
            id: randomUUID(),
            title,
            amount: type === "credit" ? amount : amount * -1,
            sessions_id: sessionsId,          
        });
    
        return replay.status(201).send();
    });
};


