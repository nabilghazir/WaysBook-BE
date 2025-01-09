import { TransactionStatus, PaymentStatus } from "@prisma/client";
import { CartDTO } from "./cart-dto";

export interface TransactionDTO {
    id: number;
    userId: number;
    cartId: number;
    shipTo?: string | null;
    totalPrice: number;
    paymentProof: string;
    status: TransactionStatus;
    payment?: PaymentDTO | null;
    cart?: CartDTO | null;
}

export interface CreateTransactionDTO {
    userId: number;
    cartId: number;
    shipTo?: string | null;
    totalPrice: number;
    paymentProof: string;
    status: TransactionStatus;
}

export interface PaymentDTO {
    id: number;
    paymentMethod: string;
    paymentUrl: string;
    paymentStatus: PaymentStatus;
}