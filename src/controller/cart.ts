import { Request, Response } from "express";
import * as cartServices from "../services/cart"
import { AddBookToCartDTO, UpdateBookQuantityDTO } from "../types/cart-dto";

// Create Cart

export const addBookToCart = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.id;
        const { bookId, quantity } = req.body;

        if (!bookId || !quantity) {
            res.status(400).json({ message: "Missing required fields: bookId and quantity" });
        }

        const data: AddBookToCartDTO = {
            userId: userId,
            bookId: Number(bookId),
            quantity: Number(quantity),
        };

        const cart = await cartServices.addBookToCartService(data);

        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export const updateBookQuantity = async (req: Request, res: Response) => {
    try {
        const { cartId, bookId, quantity } = req.body;

        if (!cartId || !bookId || !quantity) {
            res.status(400).json({ message: "Missing required fields: cartId, bookId, and quantity" });
        }

        const data: UpdateBookQuantityDTO = {
            cartId: cartId,
            bookId: bookId,
            quantity: quantity,
        };

        const cart = await cartServices.updateBookQuantityService(data);

        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export const clearCart = async (req: Request, res: Response) => {
    try {
        const cartId = Number(req.params.id);

        const cart = await cartServices.clearCartService(cartId);

        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export const getUserCartController = async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    try {
        const cart = await cartServices.getUserCart(userId)

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
}