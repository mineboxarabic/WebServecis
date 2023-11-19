export class User {
    constructor(name, email, password, role) {
        this.id = 0;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    info() {
        return `${this.name} by ${this.email}, ${this.password} pages, ${this.role}`;
    }

    setID(id){
        this.id = id;
    }
}