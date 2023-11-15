import * as authBookRoutes from "../Routes/AuthBookRoute.js";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

let conection = open({
    filename: "./database.db",
    driver: sqlite3.Database,
    });

describe("Test for authBook creation", () => {
    let req = {
        body: {
            book: 1,
            author:2,
        }

    }
    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };
    test("AuthBook created", async () => {
        await authBookRoutes.createAuthBook(req, res, conection);
        expect(res.status).toBe(201);
    });
});

describe("Test for authBook Delete", () => {
   
    test("AuthBook deleted", async () => {
        const lastID = await authBookRoutes.getLastIdAuthBook(conection);
        let req = {
            params: {
                id: lastID
            }
        }
        const res = {
            text: "",
            send: (input) => { res.text = input; },
            status: (input) => { res.status = input; }
        };
        await authBookRoutes.deleteAuthBook(req, res, conection);
        expect(res.status).toBe(200);
    });
});

describe("Test for authBook update", () => {

    test("AuthBook updated", async () => {
        const lastID = await authBookRoutes.getLastIdAuthBook(conection);
        let req = {
            params: {
                id: lastID
            },
            body: {
                book: 3,
                author: 2
            }
        }
        const res = {
            text: "",
            send: (input) => { res.text = input; },
            status: (input) => { res.status = input; }
        };

        await authBookRoutes.updateAuthBook(req, res, conection);
        expect(res.status).toBe(200);
    });

} );

describe("Test for authBook read", () => {
    
        test("AuthBook read", async () => {
            const lastID = await authBookRoutes.getLastIdAuthBook(conection);
            let req = {
                params: {
                    id: lastID
                }
            }
            const res = {
                text: "",
                send: (input) => { res.text = input; },
                status: (input) => { res.status = input; }
            };
    
            await authBookRoutes.readAuthBook(req, res, conection);
            expect(res.status).toBe(200);
        });
    
    } );

describe("Test for authBook readAll", () => {
        
            test("AuthBook readAll", async () => {
                let req = {
                    params: {
                    }
                }
                const res = {
                    text: "",
                    send: (input) => { res.text = input; },
                    status: (input) => { res.status = input; }
                };
        
                await authBookRoutes.readAllAuthBook(req, res, conection);
                expect(res.status).toBe(200);
            });
        
        } );