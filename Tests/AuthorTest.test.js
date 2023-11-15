import * as authorRoutes from '../Routes/AuthorRoute.js';
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

/* this.id = null;
    this.name = name;
    this.date = date;
    this.rate = rate;
 */

let conection = open({
    filename: './database.db',
    driver: sqlite3.Database
  });


describe('Test for author creation',  () => { 
    let date = new Date();

    test('Author created', async() => {
    let req = {
        body: {
            name : "AuthorTestCreation",
            date : date,
            rate : 1
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };

    await authorRoutes.createAuthor(req, res, conection);
        expect(res.status).toBe(201);
    });
})


describe('Test for author update',  () => {
    test('Author updated', async() => {
    let date = new Date();
    let lastId = await authorRoutes.getLastId(conection);
    let req = {
        params: {
            id : lastId
        },
        body: {
            name : "AuthorTestUpdate",
            date : date,
            rate : 1
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };

    await authorRoutes.updateAuthor(req, res, conection);
    expect(res.status).toBe(200);
    });
})

describe('Test for author delete',  () => {
    test('Author deleted', async() => {
   let lastId = await authorRoutes.getLastId(conection);
    let req = {
        params: {
            id : lastId
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };

    await authorRoutes.deleteAuthor(req, res, conection);
    expect(res.status).toBe(200);
    });
})


describe('Test for author get',  () => {
    test('Author get', async() => {
    let lastId = await authorRoutes.getLastId(conection);
    let req = {
        params: {
            id : lastId
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };

    await authorRoutes.getAuthor(req, res, conection);
    expect(res.status).toBe(200);
    });
})

describe('Test for author get all',  () => {
    test('Author get all', async() => {
    let req = {
        params: {
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };

    await authorRoutes.getAuthors(req, res, conection);
    expect(res.status).toBe(200);
    });
})
