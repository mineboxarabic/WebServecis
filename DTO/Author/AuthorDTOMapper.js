import { Author } from '../../Models/Author.js';

export class AuthorDTOMapper {

    static toDTO(author){
        return new AuthorDTO(author);
    }

    fromDTO(dto){
        return new Author(dto.name, dto.date, dto.rate);
    }

    static toDTOs(authors){
        return authors.map(author => new AuthorDTO(author));
    }
}