import { Schema, Document } from "mongoose";
import defaultType from "../utils/defaultType";
import BankAccountSchema, { BankAccountDoc } from "./BankAccount";
require("dotenv").config();

export interface TransactionDoc extends Document {
  time: string;
  amount: number;
  message: string;
  isIncome: boolean;
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
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

}

const TransactionSchema = new Schema<TransactionDoc>({
  time: defaultType.date,
  amount: defaultType.number,
  message: defaultType.requiredString,
  isIncome: defaultType.booleanFalse,
  paymentIn: {
    inApp: defaultType.boolean,
    info: BankAccountSchema,
  },
  balance: defaultType.number,
  title: defaultType.requiredString,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default TransactionSchema;
