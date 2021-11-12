import { Request, Response } from "express";
import { BankAccountModel, BankServiceModel, UserModel } from "../models";
import { axiosInstance as api } from "../utils/services";
import mongoose from "mongoose";

require("dotenv").config();

const secretKey: any = process.env.TOKEN_SECRET_KEY;

export default class UserCallback {
  static async get(req: Request, res: Response) {
    try {
      const payload = await UserModel.find();
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const payload = await UserModel.find({ balance: { $lt: 0}})
      // const { email, userName, password, identify, phoneNumber } = req.body;
      // const payload = await UserModel.create({
      //   email,
      //   userName,
      //   password,
      //   identify,
      //   phoneNumber,
      // });
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, password } = req.body;

      const payload = await UserModel.findOneAndUpdate(
        { email: id },
        { name, password }
      );

      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const userID = req.params.id;
      const payload = await UserModel.deleteOne({ _id: userID });
      return { success: true, data: payload };
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async getInfo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payload = await UserModel.findOne({ _id: id }).exec();
      return { success: true, data: payload };
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { userName, password } = req.body;
      const payload = await UserModel.findOne({ userName, password }).exec();
      return { success: true, data: payload };
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  // Rút tiền
  static async withDraw(req: Request, res: Response) {
    try {
      const { toBankAccountId, amount, userId } = req.body;
      const userInfo = await UserModel.find();
      console.log(userInfo);
      // if (amount > userInfo.balance) {
      //   res
      //     .status(500)
      //     .json({ error: "Số tiền trong tài khoản không đủ để rút tiền" });
      // } else {
      //   const query = { _id: userId };
      //   const update = { amount: userInfo.balance - amount };
      //   const payload = await UserModel.findOneAndUpdate(query,update);
      //   return { success: true, data: payload };
      // }
      // const payload = await UserModel.findOne({ bankAccountId, amount }).exec();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  // Nạp tiền
  static async recharge(req: Request, res: Response) {
    try {
      const { fromBankAccountId, amount } = req.body;
      const bankAccountDetail = await api.post("/bank/getInfo");
      if (amount > bankAccountDetail.amount) {
        return res
          .status(500)
          .json({ message: "Số tiền trong tài khoản không đủ để nạp tiền" });
      } else {
      }
      // return { success: true, data: payload };
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}