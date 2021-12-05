import { Document, Schema } from "mongoose";
import defaultType from "../utils/defaultType";
import BankAccountSchema, { BankAccountDoc } from "./BankAccount";
require("dotenv").config();

export interface UserDoc extends Document {
  email: string;
  phoneNumber: string;
  userName: string;
  password: string;
  balance: number;
}

const UserSchema = new Schema<UserDoc>({
  email: defaultType.string,
  phoneNumber: defaultType.requiredString,
  userName: defaultType.requiredString,
  password: defaultType.requiredString,
  balance: defaultType.number,
});

export default UserSchema;
