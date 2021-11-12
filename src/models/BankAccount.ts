import { Schema, Document } from 'mongoose';
import defaultType from "../utils/defaultType";
require("dotenv").config();


export interface BankAccountDoc extends Document{
    accountHolder: string;
    accountNumber: string;
    SWIFTCode: string;
    userId: string;
}


const BankAccountSchema = new Schema<BankAccountDoc>({
    accountHolder: defaultType.requiredString,
    accountNumber: defaultType.requiredString,
    SWIFTCode: defaultType.requiredString,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default BankAccountSchema;