import { BookDTO } from "./book-dto";

export interface CreateCartDTO {
    userId: number;
}

export interface AddBookToCartDTO {
    userId: number;
    bookId: number;
    quantity: number;
}

export interface UpdateBookQuantityDTO {
    cartId: number;
    bookId: number;
    quantity: number;

}

export interface CartDTO {
    id: number;
    userId: number;
    totalPrice: number | null;
    cartItems: CartItemDTO[];
}

export interface CartDetailsDTO {
    id: number;
    userId: number;
    cartItems: CartItemDTO[];
    totalPrice: number;
}

export interface CartItemDTO {
    bookId: number;
    name: string;
    price: number;
    quantity: number;
    Book: BookDTO;
}
