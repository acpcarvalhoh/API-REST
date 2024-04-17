import { beforeAll, afterAll, expect, test, describe, it } from "vitest";
import { app } from "../app";
import supertest from "supertest";
import { execSync } from "child_process";



describe("Trasactions routes", () => {
    beforeAll( async () => {
        await  app.ready()
    });
    
    afterAll(async () => {
        await app.close();
    });

    beforeAll(() => {
        execSync("npm run knex migrate:rollback all");
        execSync("npm run knex migrate:latest");
    });
    
    
    it("should be able to  create a new transaction", async () => {
        await supertest(app.server).post("/transactions").send({
            title: "Primeira trasação",
            amount: 5000,
            type: "credit"
    
        }).expect(201);
    
       
    });

    it("should be able to list all trasactions", async () => {
        const transactionResponse = await supertest(app.server)
        .post("/transactions").send({
            title: "Primeira trasação",
            amount: 5000,
            type: "credit"
    
        });

        const cookies = transactionResponse.get("Set-Cookie") as string[];

        const listTransactionResponse = await supertest(app.server)
        .get("/transactions")
        .set("Cookie", cookies)
        .expect(200)

       
        expect(listTransactionResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: "Primeira trasação",
                amount: 5000,
            }),
        ]);
       
    });

    it("should be able to list an especific transactions", async () => {
        const transactionResponse = await supertest(app.server)
        .post("/transactions")
        .send({
            title: "Primeira trasação",
            amount: 5000,
            type: "credit"
    
        });

        const cookies = transactionResponse.get("Set-Cookie") as string[];

        const listTransactionResponse = await supertest(app.server)
        .get("/transactions")
        .set("Cookie", cookies)
        .expect(200)


        const transactionId = listTransactionResponse.body.transactions[0].id;

       
        const getTransactionResponse = await supertest(app.server)
        .get(`/transactions/${transactionId}`)
        .set("Cookie", cookies)
        .expect(200);


        expect(getTransactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: "Primeira trasação",
                amount: 5000,
            }),
        );
       
    });


    it("should be able to get the sumary", async () => {
        const transactionResponse = await supertest(app.server)
        .post("/transactions").send({
            title: "credit transaction",
            amount: 5000,
            type: "credit"
    
        });

        const cookies = transactionResponse.get("Set-Cookie") as string[];

        await supertest(app.server)
        .post("/transactions")
        .set("Cookie", cookies)
        .send({
            title: "debit transaction",
            amount: 3000,
            type: "debit"
    
        });

        const sumaryResponse = await supertest(app.server)
        .get("/transactions/sumary")
        .set("Cookie", cookies)
        .expect(200)


        console.log(sumaryResponse.body.sumary)
       
        expect(sumaryResponse.body.sumary).toEqual({
            amount: 2000,
        });
       
    });



});


 
