import express from "express";
import profileTestController from "../controller/profileTest"

const cartRouter = express.Router();

cartRouter.post("/", profileTestController.postProfile)

export default cartRouter