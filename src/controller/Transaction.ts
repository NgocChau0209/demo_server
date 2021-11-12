import { Request, Response } from "express";
import { TransactionModel, BankAccountModel, UserModel } from "../models";
import UserCallback from "./User";

export default class TransactionCallback {
  static async get(req: Request, res: Response) {
    try {
      const payload = await TransactionModel.find();
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { amount, message, title, isIncome, type, from, to, userId } =
        req.body;
      /**
       * 1: Chuyển tiền
       * 2: Nhận tiền
       * 3: Rút tiền
       * 4: Nạp tiền
       */
      switch (type) {
        case 1:
          break;

        case 2:
          break;

        case 3:
          let bankList = await BankAccountModel.find({ userId: userId });
          if (!bankList.length)
            return res.json({
              success: true,
              data: { message: "Bạn chưa liên kết tài khoản ngân hàng" },
            });
          else {
            const userInfo = await UserModel.findOne({ _id: userId });
            console.log(userInfo)
            if (userInfo && amount > userInfo.balance) {
              return res.json({
                success: true,
                data: { message: "Số tiền trong tài khoản không đủ để rút" },
              });
            } else {
              // const res = await UserModel.findByIdAndUpdate(
              //   { userId: userId },
              //   { balance: userInfo.balance - amount }
              // );
              // return res.json({ success: true, data: res });
            }
          }
          break;

        case 4:
          break;

        default:
          break;
      }
      const payload = await TransactionModel.create({
        amount,
        message,
        title,
      });
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async filterMoneyFlow(req: Request, res: Response) {}

  static async filterStatus(req: Request, res: Response) {}

  static async filterMonth(req: Request, res: Response) {}
}
