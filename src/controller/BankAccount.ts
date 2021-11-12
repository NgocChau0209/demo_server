import { Request, Response } from "express";
import {
  BankAccountModel,
  BankServiceModel,
  TransactionModel,
} from "../models";
require("dotenv").config();
import { axiosInstance as api } from "../utils/services";

export default class BankAccountCallback {
  static async get(req: Request, res: Response) {
    try {
      const payload = await BankAccountModel.find();
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const bankAccountId = req.params.id;
      const payload = await TransactionModel.deleteOne({ _id: bankAccountId });
      return { success: true, data: payload };
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { accountHolder, accountNumber, SWIFTCode, userId } = req.body;
      const resBankService = await api.post("/bank/getInfo", {
        accountHolder,
        accountNumber,
        SWIFTCode,
      });
      let isExistCard = await BankAccountModel.find({accountHolder, accountNumber,SWIFTCode});
      if(isExistCard){
        res.status(200).json({ message: "Thẻ này đã được liên kết tài khoản" });
      }
      let isExistBankAccount =
        resBankService.data?.data?.isExistAccount || false;

      if (isExistBankAccount) {
        const newCard = new BankAccountModel({
          accountHolder,
          accountNumber,
          SWIFTCode,
          userId,
        });

        const payload = await newCard.save(function (err) {
          if (err) {
            console.error(err);
            return;
          }
        });
        return { success: true, data: payload };
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
