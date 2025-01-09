// routes/cartRoutes.ts
import express from "express";
import * as cartController from "../controller/cart";

const cartRouter = express.Router();

cartRouter.post("/add", cartController.addBookToCart);
cartRouter.put("/update", cartController.updateBookQuantity);
cartRouter.get("/get", cartController.getUserCartController)
cartRouter.delete("/delete/:id", cartController.clearCart);

export default cartRouter;
