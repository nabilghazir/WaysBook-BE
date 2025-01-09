import { prisma } from "../libs/prisma";
import {
    AddBookToCartDTO,
    CreateCartDTO,
    UpdateBookQuantityDTO,
    CartDetailsDTO,
    CartItemDTO
} from "../types/cart-dto";

export const createCart = async (data: CreateCartDTO) => {
    return prisma.cart.create({
        data: { userId: data.userId },
    });
};

export const findCartByUserId = async (userId: number): Promise<CartDetailsDTO | null> => {
    const cart = await prisma.cart.findFirst({
        where: { userId },
        include: {
            cartItems: {
                include: {
                    Book: true
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        },
    });

    if (!cart) {
        const create = await prisma.cart.create({
            data: { userId },
        });

        if (!create) {
            throw new Error('Failed to create cart');
        }

        return null;
    }

    const cartItems: CartItemDTO[] = cart.cartItems.map((cartItem) => ({
        bookId: cartItem.bookId,
        name: cartItem.Book.name,
        price: cartItem.Book.price,
        quantity: cartItem.quantity ?? 1,
        Book: cartItem.Book,  // Add the full Book object
    }));

    return {
        id: cart.id,
        userId: cart.userId,
        cartItems,
        totalPrice: cart.totalPrice ?? 0,
    };
};

export const addBookToCart = async (data: AddBookToCartDTO) => {
    // Check if the book exists
    const bookExists = await prisma.book.findUnique({
        where: {
            id: data.bookId,
        },
    });

    if (!bookExists) {
        throw new Error("Book does not exist");
    }

    // Retrieve or create a cart for the user
    const cart = await findCartByUserId(data.userId) || await createCart({ userId: data.userId });

    if (!cart) {
        throw new Error("Cart could not be created or found");
    }

    // Log cart info to ensure it has a valid id
    console.log("Cart found or created:", cart);

    // Now try the upsert operation
    try {
        return await prisma.cartItem.upsert({
            where: {
                cartId_bookId: {
                    cartId: cart.id,  // Make sure cart.id is defined
                    bookId: data.bookId,
                },
            },
            update: {
                quantity: {
                    increment: data.quantity,  // Increment the quantity if the item already exists
                },
            },
            create: {
                cartId: cart.id,
                bookId: data.bookId,
                quantity: data.quantity,
            },
        });
    } catch (error) {
        console.error("Upsert failed", error);
        throw new Error("Failed to add book to cart");
    }
};


export const updateBookQuantity = async (data: UpdateBookQuantityDTO) => {
    return prisma.cartItem.update({
        where: { cartId_bookId: { cartId: data.cartId, bookId: data.bookId } },
        data: { quantity: data.quantity },
    });
};

export const calculateTotalPrice = async (cartId: number) => {
    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { cartItems: { include: { Book: true } } },
    });

    if (!cart) return null;

    const totalPrice = cart.cartItems.reduce((total, cartItem) => {
        return total + cartItem.Book.price * (cartItem.quantity ?? 1);
    }, 0);

    return prisma.cart.update({
        where: { id: cartId },
        data: { totalPrice },
    });
};

export const clearCart = async (cartId: number) => {
    await prisma.cartItem.deleteMany({ where: { cartId } });
    return prisma.cart.update({ where: { id: cartId }, data: { totalPrice: 0 } });
};
