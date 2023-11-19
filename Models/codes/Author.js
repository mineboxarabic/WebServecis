export class Author {
    constructor(name, date, rate) 
    {
        this.id = null;
        this.name = name;
        this.date = date;
        this.rate = rate;
    }

    info() {
        return `${this.name} by ${this.date}, ${this.rate} pages, ${this.read}`;
    }

    setID(id){
        this.id = id;
    }
}