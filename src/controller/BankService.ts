import { Request, Response } from "express";
import { BankServiceModel } from "../models";
require("dotenv").config();

export default class BankServiceCallback {
  static async create(req: Request, res: Response) {
    try {
      const {
        dob,
        gender,
        identify,
        email,
        address,
        phoneNumber,
        accountHolder,
        accountNumber,
        SWIFTCode,
      } = req.body;
      const payload = await BankServiceModel.create({
        dob,
        gender,
        identify,
        email,
        address,
        phoneNumber,
        accountHolder,
        accountNumber,
        balance: 0,
        SWIFTCode,
      });
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  static async get(req: Request, res: Response) {
    try {
      const payload = await BankServiceModel.find({ 'identify': '272709289' });
      // const payload = await BankServiceModel.aggregate([{ $match: { 'identify': '272709289' } }]);
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async getInfo(req: Request, res: Response) {
    try {
      const { accountHolder, accountNumber, SWIFTCode } = req.body;
      const payload =
        (await BankServiceModel.findOne({
          accountHolder,
          accountNumber,
          SWIFTCode,
        }).exec()) || {};
      return res.json({
        success: true,
        data: { isExistAccount: Object.keys(payload).length ? true : false },
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async recharge(req: Request, res: Response) {
    try {
      const { accountHolder, accountNumber } = req.body;
      const payload = await BankServiceModel.find({
        accountHolder,
        accountNumber,
      }).exec();
      return {
        success: true,
        data: { isExistAccount: payload ? true : false },
      };
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async reciept(req: Request, res: Response) {
    try {
      const { accountHolder, accountNumber } = req.body;
      const payload = await BankServiceModel.find({
        accountHolder,
        accountNumber,
      }).exec();
      return {
        success: true,
        data: { isExistAccount: payload ? true : false },
      };
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
