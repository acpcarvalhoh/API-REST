import { beforeAll, afterAll, expect, test, describe } from "vitest";
import { app } from "../app";
import supertest from "supertest";
import { it } from "node:test";


describe("Trasactions routes", () => {
    beforeAll( async () => {
        await  app.ready()
    });
    
    afterAll(async () => {
        await app.close();
    });
    
    
    it("should be able to  create a new transaction", async () => {
        await supertest(app.server).post("/transactions").send({
            title: "Primeira trasação",
            amount: 5000,
            type: "credit"
    
        }).expect(201);
    
       
    });

    it("should be able to list all trasctions", async () => {
        const createTrasactionResponse = await supertest(app.server).post("/transactions").send({
            title: "Primeira trasação",
            amount: 5000,
            type: "credit"
    
        });

        const cookies = createTrasactionResponse.get("Set-Cookie")
        await supertest(app.server)
        .get("/transactions")
        .set("Cookie", cookies)
        .expect(200)
       
    });
    
});


 
