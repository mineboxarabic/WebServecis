export class User {
    constructor(name, email, password, role, created_at) {
        this.id = 0;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.created_at = created_at;
    }

    info() {
        return `${this.name} by ${this.email}, ${this.password} pages, ${this.role}`;
    }

    setID(id){
        this.id = id;
    }
}