import * as bookRoutes from '../Routes/BooksRoute.js';
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import { BookSQLiteDAO } from '../DBLayer/BookSQLiteDAO.js'
/* this.id = null;
this.title = title;
this.date = date;
this.author = author;
this.rated = rated;
 */

let conection = open({
    filename: './database.db',
    driver: sqlite3.Database
  });


describe('Test for book creation',  () => { 
    let date = new Date();

    test('Book created', async() => {
    let req = {
        body: {
            title : "BookTestCreation",
            date : date,
            author : 1,
            rated : 1
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };

    await bookRoutes.createBook(req, res, conection);
        expect(res.status).toBe(201);
    });
})

describe('Test for book delete',  () => {
    test('Book deleted', async() => {
   let lastId = await bookRoutes.getLastId(conection);
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

    await bookRoutes.deleteBook(req, res, conection);
    expect(res.status).toBe(200);
    });
})

describe('Test for book update',  () => {
    test('Book updated', async() => {
    let date = new Date();
    let lastId = await bookRoutes.getLastId(conection);
    let req = {
        params: {
            id : lastId
        },
        body: {
            title : "BookTestUpdate",
            date : date,
            author : 1,
            rated : 1
        }
    }

    const res = {
        text: "",
        send: (input) => { res.text = input; },
        status: (input) => { res.status = input; }
    };

    await bookRoutes.updateBook(req, res, conection);
    expect(res.status).toBe(200);
    });
})