import { Schema, Document } from "mongoose";
import defaultType from "../utils/defaultType";
import { TransactionDoc } from "./Transaction";
import BankAccountSchema, { BankAccountDoc } from "./BankAccount";
require("dotenv").config();

interface TransactionBankDoc extends BankAccountDoc, TransactionDoc {
  from: {
    bankAcountId: string;
  };
  to: {
    bankAcountId: string;
  };
}

const TransactionBankSchema = new Schema<TransactionBankDoc>({
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
  from: {
    type: Schema.Types.ObjectId,
    ref: "BankAccount",
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "BankAccount",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default TransactionBankSchema;
