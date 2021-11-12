import { Router } from "express";
import TransactionCallback from "../controller/Transaction";
const TransactionRouter = Router();

TransactionRouter.get("/", TransactionCallback.get);
TransactionRouter.post("/create", TransactionCallback.create);

export default TransactionRouter;
