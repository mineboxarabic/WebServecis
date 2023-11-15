export class Book {
    constructor(title,date, author,rated) {
        this.id = null;
        this.title = title;
        this.date = date;
        this.author = author;
        this.rated = rated;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }

    setID(id){
        this.id = id;
    }
}