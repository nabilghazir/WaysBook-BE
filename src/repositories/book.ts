import { prisma } from "../libs/prisma";
import { BookDTO } from "../types/book-dto";

export const createBook = async (book: BookDTO) => {
    return prisma.book.create({
        data: {
            ...book,
        }
    })
}

export const getAllBook = async () => {
    return prisma.book.findMany({
    })
}

export const getBookDetail = async (id: number) => {
    return prisma.book.findFirst({
        where: {
            id: id
        }
    })
}

export const deleteBook = async (id: number) => {

    await prisma.cartItem.deleteMany({
        where: {
            bookId: id
        }
    });

    return prisma.book.delete({
        where: {
            id: id
        }
    })
}

export const updateBook = async (id: number, book: BookDTO) => {
    return prisma.book.update({
        where: {
            id: id
        },
        data: {
            ...book
        }
    })
}