import { Request, Response } from "express";
import { BankServiceModel } from "../models";
require("dotenv").config();

export default class BankServiceCallback {
  static async create(req: Request, res: Response) {
    try {
      const {
        accountHolder,
        accountNumber,
        type,
        expiredate,
      } = req.body;
      const payload = await BankServiceModel.create({
        accountHolder,
        accountNumber,
        type,
        expiredate,
      });
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async getInfo(req: Request, res: Response) {
    try {
      const { accountHolder, accountNumber, type, expiredate } = req.body;
      const payload =
        await BankServiceModel.findOne({
          accountHolder,
          accountNumber,
          type,
          expiredate,
        }).exec() || {};
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
