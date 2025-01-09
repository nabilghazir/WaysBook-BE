import * as bookRepositories from "../repositories/book";
import { BookDTO } from '../types/book-dto';

export const getAllBook = async () => {
    return bookRepositories.getAllBook();
}

export const getBookDetail = async (id: number) => {
    return bookRepositories.getBookDetail(id);
}

export const createBook = async (book: BookDTO) => {
    console.log("Ini kedebook", book);

    return bookRepositories.createBook(book);
}

export const updateBook = async (id: number, book: BookDTO) => {
    return bookRepositories.updateBook(id, book);
}

export const deleteBook = async (id: number) => {
    return bookRepositories.deleteBook(id);
}