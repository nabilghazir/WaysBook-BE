import express from "express";
import * as transactionController from "../controller/transaction";

const transactionRouter = express.Router();

transactionRouter.post("/create-from-cart", transactionController.createTransactionFromCart);

transactionRouter.post("/create-with-payment", transactionController.createTransactionWithPayment);

transactionRouter.get("/:transactionId", transactionController.getTransactionById);

transactionRouter.get("/user/:userId", transactionController.getAllTransactionsForUser);

export default transactionRouter;