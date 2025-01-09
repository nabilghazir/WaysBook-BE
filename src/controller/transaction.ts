import { Request, Response } from "express";
import * as transactionService from "../services/transaction";
import { TransactionDTO } from "../types/transaction-dto";
import uploader from "../libs/cloudinary";

export const createTransactionFromCart = async (req: Request, res: Response) => {
    const { userId, shipTo } = req.body;

    let paymentProof = req.body.paymentProof;

    if (req.file) {
        paymentProof = await uploader(req.file as Express.Multer.File);
    }

    if (!userId || !shipTo) {
        res.status(400).json({ error: "UserId and shipTo are required" });
    }

    try {
        const transaction: TransactionDTO = await transactionService.createTransactionFromCart(userId, shipTo, paymentProof);
        res.status(201).json(transaction);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export const createTransactionWithPayment = async (req: Request, res: Response) => {
    const { userId, shipTo } = req.body;

    if (!userId || !shipTo) {
        res.status(400).json({ error: "UserId and shipTo are required" });
    }

    try {
        const { transaction, paymentUrl } = await transactionService.createTransactionWithPayment(userId, shipTo);

        res.status(201).json({ transaction, paymentUrl });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export const getTransactionById = async (req: Request, res: Response) => {
    const transactionId = parseInt(req.params.transactionId, 10);

    if (isNaN(transactionId)) {
        res.status(400).json({ error: "Invalid transaction ID" });
    }

    try {
        const transaction = await transactionService.getTransactionById(transactionId);
        if (!transaction) {
            res.status(404).json({ error: "Transaction not found" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export const getAllTransactionsForUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        const transactions = await transactionService.getAllTransactionsForUser(userId);
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
