import { Schema, Document } from "mongoose";
import defaultType from "../utils/defaultType";
import BankAccountSchema, { BankAccountDoc } from "./BankAccount";
require("dotenv").config();

export interface TransactionMethodDoc extends Document {
  /** 
  * 1: Chuyển tiền
  * 2: Nhận tiền 
  * 3: Rút tiền
  * 4: Nạp tiền
  */
  type: number;
  
}

const TransactionMethodSchema = new Schema<TransactionMethodDoc>({
  
});

export default TransactionMethodSchema;
