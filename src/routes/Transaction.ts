import { Router } from "express";
import { authenticateJWT } from "../module/auth";
import TransactionCallback from "../controller/Transaction";
const TransactionRouter = Router();

TransactionRouter.get("/", authenticateJWT, TransactionCallback.get);
TransactionRouter.post("/create", authenticateJWT, TransactionCallback.create);
TransactionRouter.post("/create-link", authenticateJWT, TransactionCallback.createLink);
TransactionRouter.post("/deposit-info", authenticateJWT, TransactionCallback.depositLinkInfo);
TransactionRouter.post("/deposit", authenticateJWT, TransactionCallback.deposit);
TransactionRouter.post("/info", authenticateJWT, TransactionCallback.info);


export default TransactionRouter;
