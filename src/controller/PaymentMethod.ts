// import { Request, Response } from "express";
// import {
//   PaymentMethodModel,
//   BankServiceModel,
//   TransactionModel,
// } from "../models";
// require("dotenv").config();
// import { axiosInstance as api } from "../utils/services";

// export default class BankAccountCallback {
//   static async get(req: Request, res: Response) {
//     try {
//       const payload = await PaymentMethodModel.find();
//       return res.json({ success: true, data: payload });
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
//   }

//   static async delete(req: Request, res: Response) {
//     try {
//       const bankAccountId = req.params.id;
//       const payload = await TransactionModel.deleteOne({ _id: bankAccountId });
//       return { success: true, data: payload };
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
//   }

//   static async create(req: Request, res: Response) {
//     try {
//       const { accountHolder, accountNumber, SWIFTCode, userId } = req.body;
//       const resBankService = await api.post("/bank/getInfo", {
//         accountHolder,
//         accountNumber,
//         SWIFTCode,
//       });
//       let isExistBankAccount =
//         resBankService.data?.data?.isExistAccount || false;

//       const res = await BankAccountModel.aggregate([
//         { $match: { accountHolder: "TRAN THI NGOC CHAU" } },
//         { $group: { _id: "$userId"} }
//       ]);

//       console.log(res);

//       // if (isExistBankAccount) {
//       //   const newCard = new BankAccountModel({
//       //     accountHolder,
//       //     accountNumber,
//       //     SWIFTCode,
//       //     userId,
//       //   });

//       //   await newCard.save(function (err) {
//       //     if (err) {
//       //       console.error(err);
//       //       return;
//       //     }
//       //   });
//       // }
//     } catch (err) {
//       res.status(500).json({ error: err });
//     }
//   }
// }
