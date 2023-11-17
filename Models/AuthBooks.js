export class AuthBooks {
    constructor(book, author){
        this.id = null;
        this.book = book;
        this.author = author;
    }

    info() {
        return `${this.book} by ${this.author}`;
    }

    setID(id){
        this.id = id;
    }
}