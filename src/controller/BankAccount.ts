import { Request, Response } from "express";
import {
  BankAccountModel,
  TransactionModel,
} from "../models";
require("dotenv").config();
import { axiosInstance as api } from "../utils/services";
import { convertToMongoID } from '../module/function';

export default class BankAccountCallback {
  static async info(req: any, res: Response) {
    try {
      let { id } = req.body;
      const payload = await BankAccountModel.aggregate([
        { $match: {  _id: convertToMongoID(id) }  },
      ])
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  static async get(req: any, res: Response) {
    try {
      let { userId } = req;
      const payload = await BankAccountModel.find({ userId }).exec();
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
  static async create(req: any, res: Response) {
    try {
      let { userId } = req;
      const { accountHolder, accountNumber, type, expiredate } = req.body;
      // services 
      const resBankService = await api.post("/bank/getInfo", {
        accountHolder,
        accountNumber,
        type,
        expiredate
      });
      let isExistBankAccount =
        resBankService.data?.data?.isExistAccount || false;
      if (!isExistBankAccount) {
        return res.status(200).json({ error: "Vui lòng kiểm tra thông lại thông tin" });
      }
      // check is linked
      let isRegisterCard = await BankAccountModel.find({ accountHolder, accountNumber, type, expiredate });
      if (isRegisterCard.length) {
        return res.status(200).json({ error: "Thẻ này đã được liên kết tài khoản" });
      }
      // write new record
      const payload = await BankAccountModel.create({
        accountHolder,
        accountNumber,
        type,
        expiredate,
        userId,
      });
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  static async update(req: any, res: Response) {
    try {
      let { userId } = req;
      const {
        id,
        accountHolder,
        accountNumber,
        type,
        expiredate,
      } = req.body;

      // services 
      const resBankService = await api.post("/bank/getInfo", {
        accountHolder,
        accountNumber,
        type,
        expiredate
      });
      let isExistBankAccount =
        resBankService.data?.data?.isExistAccount || false;
      if (!isExistBankAccount) {
        return res.status(200).json({ error: "Vui lòng kiểm tra thông lại thông tin" });
      }
      // update new record
      const payload = await BankAccountModel.findOneAndUpdate(
        { userId, _id: id },
        {
          accountHolder,
          accountNumber,
          type,
          expiredate,
        }
      );
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
