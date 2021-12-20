import { Schema, Document } from 'mongoose';
import defaultType from "../utils/defaultType";
require("dotenv").config();

export interface BankAccountDoc extends Document{
    accountHolder: string;
    accountNumber: string;
    expiredate: string;
    type: string;
    userId: string;
}

const BankAccountSchema = new Schema<BankAccountDoc>({
    accountHolder: defaultType.requiredString,
    accountNumber: defaultType.requiredString,
    type: defaultType.requiredString,
    expiredate: defaultType.requiredString,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default BankAccountSchema;