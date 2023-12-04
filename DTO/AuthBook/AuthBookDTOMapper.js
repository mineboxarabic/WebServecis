


import { AuthBookDTO } from './AuthBookDTO';
import { AuthBooks } from '../../Models/AuthBooks.js';

export class AuthBookDTOMapper {
    
        static toDTO(authBook){
            return new AuthBookDTO(authBook);
        }
    
        fromDTO(dto){
            return new AuthBooks(dto.book, dto.author);
        }
    
        static toDTOs(authBooks){
            return authBooks.map(authBook => new AuthBookDTO(authBook));
        }
}