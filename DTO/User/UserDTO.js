
import { User } from '../../Models/User.js'

export default class UserDTO{
    constructor( name, email, password, role){
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
   }
}