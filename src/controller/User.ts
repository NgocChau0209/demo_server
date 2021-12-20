import { generateToken } from './../module/auth';
import { Request, Response } from "express";
import { BankAccountModel, BankServiceModel, UserModel } from "../models";
import { axiosInstance as api } from "../utils/services";
import mongoose from "mongoose";

require("dotenv").config();

const secretKey: any = process.env.TOKEN_SECRET_KEY;

export default class UserCallback {
  static async get(req: any, res: Response) {
    try {
      let { userId } = req;
      console.log('profile', req)
      const payload = await UserModel.findOne({ _id: userId }).exec();
      console.log(payload)
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  // static async update(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;
  //     const { name, password } = req.body;

  //     const payload = await UserModel.findOneAndUpdate(
  //       { email: id },
  //       { name, password }
  //     );

  //     return res.json({ success: true, data: payload });
  //   } catch (err) {
  //     res.status(500).json({ error: err });
  //   }
  // }


  static async checkEmailExist(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await UserModel.findOne({ email });
      if (result) {
        res.json({ success: false, message: "Email này đã được đăng kí" });
      }
      else {
        res.json({ success: true, message: "" })
      }
    }
    catch (err) {
      res.status(500).json({ error: (err) });
    }
  }
  static async checkPhoneNumberExist(req: Request, res: Response) {
    try {
      const { phoneNumber } = req.body;
      const result = await UserModel.findOne({ phoneNumber }).select('phoneNumber userName');
      res.json({ success: true, data: { isExist: result ? true : false } })
    }
    catch (err) {
      res.status(500).json({ error: (err) });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const { phoneNumber, password, userName } = req.body;
      let isExitsPhoneNumber = await UserModel.findOne({ phoneNumber });
      if (!isExitsPhoneNumber) {
        const payload = await UserModel.create({
          phoneNumber, password, userName
        });
        return res.json({ success: true });
      }
      return res.json({ success: false });
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ error: (err) });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { phoneNumber, password } = req.body;
      const payload = await UserModel.findOne({ phoneNumber, password });
      let userId = payload?._id;
      let token = generateToken(userId);
      return res.json({ success: true, token, userInfo: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
