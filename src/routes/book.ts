import * as bookController from "../controller/book";
import { Router } from "express";
import upload from "../middlewares/upload-file";

const bookRouter = Router();

bookRouter.post("/create", upload.single("bookImage"), bookController.createBook)

bookRouter.get("/get", bookController.getAllBook)

bookRouter.get("/get/:id", bookController.getBookDetail)

bookRouter.put("/update/:id", upload.single("bookImage"), bookController.updateBook)

bookRouter.delete("/delete/:id", bookController.deleteBook)

export default bookRouter