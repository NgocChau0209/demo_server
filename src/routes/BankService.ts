import { Router } from "express";
import BankServiceCallback from "../controller/BankService";

const BankServiceRouter = Router();

BankServiceRouter.post("/create", BankServiceCallback.create);
BankServiceRouter.post("/getInfo", BankServiceCallback.getInfo);
BankServiceRouter.post("/recharge", BankServiceCallback.recharge);
BankServiceRouter.post("/reciept", BankServiceCallback.reciept);

export default BankServiceRouter;
