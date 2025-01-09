// services/cartService.ts
import * as cartRepository from "../repositories/cart";
import { CreateCartDTO, AddBookToCartDTO, UpdateBookQuantityDTO, CartDetailsDTO } from "../types/cart-dto";

export const createCartService = async (data: CreateCartDTO) => {
    const cart = await cartRepository.createCart(data);

    return cartRepository.findCartByUserId(cart.userId);
};

export const addBookToCartService = async (data: AddBookToCartDTO) => {
    const updatedCart = await cartRepository.addBookToCart(data);
    return cartRepository.calculateTotalPrice(data.userId);
};

export const updateBookQuantityService = async (data: UpdateBookQuantityDTO) => {
    await cartRepository.updateBookQuantity(data);
    return cartRepository.calculateTotalPrice(data.cartId);
};

export const clearCartService = async (cartId: number) => {
    await cartRepository.clearCart(cartId);
    return cartRepository.findCartByUserId(cartId);
};


export const getUserCart = async (userId: number): Promise<CartDetailsDTO | null> => {

    return cartRepository.findCartByUserId(userId);
};