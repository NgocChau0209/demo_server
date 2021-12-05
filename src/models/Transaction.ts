import { Schema, Document } from "mongoose";
import defaultType from "../utils/defaultType";
import BankAccountSchema, { BankAccountDoc } from "./BankAccount";
require("dotenv").config();

export interface TransactionDoc extends Document {
  time: string;
  amount: number;
  message: string;
  /** 
  * 1: Chuyển tiền
  * 2: Nhận tiền 
  * 3: Rút tiền
  * 4: Nạp tiền
  */
  type: number;
  balance: number;
  title: string;
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: number;

}

const TransactionSchema = new Schema<TransactionDoc>({
  time: defaultType.date_now,
  amount: defaultType.number,
  message: defaultType.string,
  balance: defaultType.number,
  title: defaultType.string,
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: defaultType.number
});

export default TransactionSchema;
