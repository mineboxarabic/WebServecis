import { AuthBooks } from '../../Models/AuthBooks.js';
export class AuthBookDTO {
    constructor(book, author) {
        this.book = book;
        this.author = author;
    }
}