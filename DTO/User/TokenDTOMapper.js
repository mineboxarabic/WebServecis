import TokenDTO from "./TokenDTO";

import { Token } from "../../Models/Token";


export class TokenDTOMapper {
    static toDTO(token) {
        return new TokenDTO(token);
    }

    static fromDTO(dto) {
        return new Token(dto.id, dto.token, dto.user_id);
    }

    static toDTOs(tokens) {
        return tokens.map(token => new TokenDTO(token));
    }
}