
import { BookDAO } from '../dataAccess/BooksDAO.js'
import { Book } from '../Models/Book.js';


export class BookSQLiteDAO extends BookDAO {
    constructor(db) {
        super();

        this.db = db;
    }

    async update(book, id) {
        let request = await this.db.run(`UPDATE books SET title = '${book.title}', date = '${book.date}', rated = '${book.rated}' WHERE id = ${id}`);
        let newBook = await this.read(id);
        return newBook;
    }

    async delete(id) {


        let book = await this.read(id);
        if (book == undefined) {
            return undefined;
        }

        await this.db.exec(`DELETE FROM books WHERE id = ${id}`);
        return book;
    }

    async create(book) {
        const request = await this.db.run(`INSERT INTO books (title, date, author_id, rated) VALUES ('${book.title}', '${book.date}', '${book.author}','${book.rated}')`);
        book.setID(request.lastID);
        return book;
    }

    async read(id) {

        const book = await this.db.get(`SELECT * FROM books WHERE id = ${id}`);
        if (book == undefined) {
            return undefined;
        }
        let bookObject = new Book(book.title, book.date, book.author_id, book.rated);
        bookObject.setID(book.id);
        return bookObject;
    }

    async readAll() {

        return await this.db.all(`SELECT * FROM books`);
    }

    async deleteAll() {
        await this.db.exec(`DELETE FROM books`);
    }

    async getLastID() {
        let id = await this.db.get(`SELECT MAX(id) FROM books`);
        return id;
    }

}