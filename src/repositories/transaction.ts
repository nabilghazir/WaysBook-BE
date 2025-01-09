// repositories/transactionRepository.ts
import { prisma } from "../libs/prisma";
import { PaymentStatus } from "@prisma/client";
import { CreateTransactionDTO, TransactionDTO } from "../types/transaction-dto";

export const createTransaction = async (data: CreateTransactionDTO): Promise<TransactionDTO> => {
    return await prisma.transaction.create({
        data: {
            userId: data.userId,
            cartId: data.cartId,
            shipTo: data.shipTo,
            totalPrice: data.totalPrice,
            status: data.status,
            paymentProof: data.paymentProof
        },
        include: {
            Cart: {
                include: {
                    cartItems: {
                        include: {
                            Book: true,
                        },
                    },
                },
            },
        },
    });
};

export const findTransactionById = async (transactionId: number): Promise<TransactionDTO | null> => {
    return await prisma.transaction.findUnique({
        where: { id: transactionId },
        include: {
            Payment: true,
            Cart: {
                include: {
                    cartItems: {
                        include: {
                            Book: true,
                        },
                    },
                },
            },
        },
    });
};

export const findTransactionByCartId = async (cartId: number): Promise<TransactionDTO | null> => {
    return await prisma.transaction.findUnique({
        where: { cartId },
    });
};

export const findAllTransactionsForUser = async (userId: number): Promise<TransactionDTO[]> => {
    return await prisma.transaction.findMany({
        where: { userId },
        include: {
            Cart: {
                include: {
                    cartItems: {
                        include: {
                            Book: true,
                        },
                    },
                },
            },
        },
    });
};

export const updateTransactionPayment = async (transactionId: number, paymentData: { paymentMethod: string; paymentURL: string }) => {
    return await prisma.transaction.update({
        where: { id: transactionId },
        data: {
            Payment: {
                create: {
                    paymentMethod: paymentData.paymentMethod,
                    paymentURL: paymentData.paymentURL,
                    paymentStatus: PaymentStatus.PENDING,
                },
            },
        },
        include: {
            Payment: true,
        },
    });
};


export const getAllTransactions = async (): Promise<TransactionDTO[]> => {
    return await prisma.transaction.findMany({
        include: {
            Cart: true,
            Payment: true,
        },
    });
};

export const sumAllTransactionsAmount = async (): Promise<number> => {
    const sum = await prisma.transaction.aggregate({
        _sum: {
            totalPrice: true,
        },
    });

    return sum._sum.totalPrice ?? 0;
};
