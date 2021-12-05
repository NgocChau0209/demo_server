import { Router } from "express";
import { authenticateJWT } from "../module/auth";
import BankAccountCallback from "../controller/BankAccount";
const BankAccountRoute = Router();


BankAccountRoute.get('/', authenticateJWT, BankAccountCallback.get);
BankAccountRoute.post('/add', authenticateJWT, BankAccountCallback.create);
BankAccountRoute.post('/delete', authenticateJWT, BankAccountCallback.delete);

export default BankAccountRoute;