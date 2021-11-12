import mongoose from "mongoose";
import UserSchema, { UserDoc } from "./User";
import TransactionSchema, { TransactionDoc } from "./Transaction";
import BankAccountSchema, { BankAccountDoc } from "./BankAccount";
import BankServiceSchema, { BankServiceDoc } from "./BankService";

const UserModel = mongoose.model<UserDoc>("User", UserSchema);

const TransactionModel = mongoose.model<TransactionDoc>(
  "Transaction",
  TransactionSchema
);

const BankAccountModel = mongoose.model<BankAccountDoc>(
  "BankAccount",
  BankAccountSchema
);

const BankServiceModel = mongoose.model<BankServiceDoc>(
  "BankService",
  BankServiceSchema
);

export { UserModel, TransactionModel, BankAccountModel, BankServiceModel };
