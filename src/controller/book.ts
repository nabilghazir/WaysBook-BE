import { Request, Response } from 'express'
import * as bookService from '../services/book'
import uploader from '../libs/cloudinary'

export const createBook = async (req: Request, res: Response) => {
    try {
        const book = req.body

        book.pages = Number(book.pages)
        book.price = Number(book.price)

        if (req.file) {
            book.bookImage = await uploader(req.file as Express.Multer.File);
        }

        const createdBook = await bookService.createBook(book)
        res.json({
            message: "Book has been created",
            createdBook
        })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ message: err.message })
    }
}

export const getAllBook = async (req: Request, res: Response) => {
    try {
        const books = await bookService.getAllBook()
        res.json(books)
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ message: err.message })
    }
}

export const getBookDetail = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const book = await bookService.getBookDetail(id)
        res.json(book)
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ message: err.message })
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const book = req.body

        book.pages = Number(book.pages)
        book.price = Number(book.price)

        if (req.file) {
            book.bookImage = await uploader(req.file as Express.Multer.File);
        }

        const updatedBook = await bookService.updateBook(id, book)
        res.json({
            message: "Book ID " + id + " has been updated",
            updatedBook
        })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ message: err.message })
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const deletedBook = await bookService.deleteBook(id)
        res.json({
            message: "Book ID " + id + " has been deleted",
            deletedBook
        })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ message: err.message })
    }
}