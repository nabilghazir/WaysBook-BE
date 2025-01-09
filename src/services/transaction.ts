import * as transactionRepo from "../repositories/transaction";
import * as cartRepo from "../repositories/cart"
import { TransactionStatus } from "@prisma/client";
import { TransactionDTO, CreateTransactionDTO } from "../types/transaction-dto";
import midTrans from "../libs/midtrans";

export const createTransactionFromCart = async (userId: number, shipTo: string, paymentProof: string): Promise<TransactionDTO> => {
    const cart = await cartRepo.findCartByUserId(userId);

    if (!cart || !cart.cartItems.length) {
        throw new Error("Cannot create transaction. Cart is empty.");
    }
    const existingTransaction = await transactionRepo.findTransactionByCartId(cart.id);
    if (existingTransaction) {
        throw new Error("Transaction already exists for this cart. Complete or cancel the existing transaction.");
    }

    const totalAmount = cart.cartItems.reduce((total, item) => {
        const quantity = item.quantity ?? 1;
        return total + item.Book.price * quantity;
    }, 0);

    const transactionData: CreateTransactionDTO = {
        userId,
        cartId: cart.id,
        shipTo,
        totalPrice: totalAmount,
        status: TransactionStatus.PENDING,
        paymentProof: paymentProof,
    };

    const transaction = await transactionRepo.createTransaction(transactionData);

    await cartRepo.calculateTotalPrice(cart.id);

    await cartRepo.clearCart(cart.id);

    return transaction;
};


export const getTransactionById = async (transactionId: number): Promise<TransactionDTO | null> => {
    return await transactionRepo.findTransactionById(transactionId);
};

export const getAllTransactionsForUser = async (userId: number): Promise<TransactionDTO[]> => {
    return await transactionRepo.findAllTransactionsForUser(userId);
};

export const createTransactionWithPayment = async (userId: number, shipTo: string) => {
    const cart = await cartRepo.findCartByUserId(userId);
    if (!cart || !cart.cartItems.length) {
        throw new Error("Cannot create transaction. Cart is empty.");
    }

    const existingTransaction = await transactionRepo.findTransactionByCartId(cart.id);
    if (existingTransaction) {
        return { transaction: existingTransaction, paymentUrl: existingTransaction.payment?.paymentUrl };
    }

    const totalAmount = cart.cartItems.reduce((total, item) => {
        const quantity = item.quantity ?? 1;
        return total + item.Book.price * quantity;
    }, 0);

    const transactionData: CreateTransactionDTO = {
        userId,
        cartId: cart.id,
        shipTo,
        totalPrice: totalAmount,
        status: TransactionStatus.PENDING,
        paymentProof: "",
    };
    const transaction = await transactionRepo.createTransaction(transactionData);

    const paymentPayload = {
        transaction_details: {
            order_id: `ORDER-${transaction.id}`,
            gross_amount: totalAmount,
        },
        customer_details: {
            first_name: "Customer",
            email: "customer@example.com",
        },
    };
    const midtransResponse = await midTrans.createTransaction(paymentPayload);

    await transactionRepo.updateTransactionPayment(transaction.id, {
        paymentMethod: "midtrans",
        paymentURL: midtransResponse.redirect_url,
    });

    await cartRepo.clearCart(cart.id);

    return { transaction, paymentUrl: midtransResponse.redirect_url };
};

export const getTransactionByCartId = async (cartId: number): Promise<TransactionDTO | null> => {
    return await transactionRepo.findTransactionByCartId(cartId);
};

export const getAllTransactions = async (): Promise<TransactionDTO[]> => {
    return await transactionRepo.getAllTransactions();
};

export const getTransactionsAmount = async (): Promise<number> => {
    return await transactionRepo.sumAllTransactionsAmount();
};
