import { Schema, Document } from "mongoose";
import defaultType from "../utils/defaultType";
require("dotenv").config();

export interface BankServiceDoc extends Document {
  dob: string;
  gender: number;
  identify: string;
  email: string;
  address: string;
  phoneNumber: string;
  accountHolder: string;
  accountNumber: string;
  balance: number;
  SWIFTCode: string;
}

const BankServiceSchema = new Schema<BankServiceDoc>({
  dob: defaultType.date,
  // 1: female , 2:male , 3: other
  gender: defaultType.number,
  identify: defaultType.requiredString,
  email: defaultType.requiredString,
  phoneNumber: defaultType.requiredString,
  address: defaultType.string,
  accountHolder: defaultType.requiredString,
  accountNumber: defaultType.requiredString,
  balance: defaultType.number,
  SWIFTCode: defaultType.requiredString
});

export default BankServiceSchema;
