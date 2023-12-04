
import { BookDTO } from './BookDTO.js';
import { Book } from '../../Models/Book.js';


export class BookDTOMapper {

    static toDTO(book){
        return new BookDTO(book);
    }

    fromDTO(dto){
        return new Book(dto.title, dto.date, dto.author, dto.rated);
    }

    static toDTOs(books){
        return books.map(book => new BookDTO(book));
    }
}