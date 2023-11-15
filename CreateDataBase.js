import sqlite3 from 'sqlite3'
import { open } from 'sqlite'



import { BookDAO } from './DAO Layer/BooksDAO.js'
import { Book }  from './Classes/Book.js'
import { BookSQLiteDAO } from './DBLayer/BookSQLiteDAO.js'

import { Author }  from './Classes/Author.js'
import { AuthorSQLiteDAO } from './DBLayer/AuthorSQLiteDAO.js'
import { AuthBooks } from './Classes/AuthBooks.js'
import { AuthBookSQLiteDAO } from './DBLayer/AuthBookSQLiteDAO.js'


open({
    filename: './database.db',
    driver: sqlite3.Database
  }).then((db) => {


    db.exec(`CREATE TABLE If NOT EXISTS authors 
    ( id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT,
          date DATE,
           rate INT);
    `
        );


    db.exec(`CREATE TABLE If NOT EXISTS books 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        date DATE,
        rated INT,
        author_id INT
    );
    `);


    db.exec(`CREATE TABLE If NOT EXISTS authbooks
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author_id INT,
        book_id INT
    );`);



/*
    let book = new Book("The Hobbit2",new Date(), 2, 1);
    let book2 = new Book("The Hobbit3",new Date(), 3, 2);
    

     let author = new Author("J.R.R. Tolkien", new Date(), 5);
     let author2 = new Author("J.R.R. Tolkien22", new Date(), 5);




     let bookDAO = new BookSQLiteDAO(db);
     let authorDAO = new AuthorSQLiteDAO(db);
     let authbookDAO = new AuthBookSQLiteDAO(db);






    //console.log("CP1");
    bookDAO.create(book);
    bookDAO.create(book2);

    authorDAO.create(author);
    authorDAO.create(author2);


    let authbook = new AuthBooks(book.id, author.id);
    let authbook2 = new AuthBooks(book2.id, author2.id);

    authbookDAO.create(authbook);
    authbookDAO.create(authbook2);

*/

  })


