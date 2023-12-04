import { User } from "../../Models/User.js";
import { UserSQLiteDAO } from '../../repositories/UserSQLiteDAO.js'
import UserDTO from "./UserDTO.js";

export class UserDTOMapper {
    constructor() {
        
    }
    toDTO(user) {
        return new UserDTO(user);
    }

    fromDTO(dto,id) {
        const userRET =  new User(dto.name, dto.email, dto.password, dto.role);
        userRET.setID(id);
        return userRET;
    }

    static toDTOs(users) {
        return users.map(user => new UserDTO(user));
    }
}
