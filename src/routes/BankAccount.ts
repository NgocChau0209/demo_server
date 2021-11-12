import { Router } from "express";
import BankAccountCallback from "../controller/BankAccount";
const BankAccountRoute = Router();


BankAccountRoute.get('/',BankAccountCallback.get);
BankAccountRoute.post('/add',BankAccountCallback.create);
BankAccountRoute.post('/delete',BankAccountCallback.delete);

export default BankAccountRoute;