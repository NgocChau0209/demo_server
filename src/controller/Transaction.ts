import { getCurrentTime } from './../module/common';
import { decodeToken, verifyToken, generateToken } from './../module/auth';
import { Request, Response } from "express";
import { TransactionModel, BankAccountModel, UserModel } from "../models";
import { convertToMongoID } from '../module/function';
import UserCallback from "./User";

export default class TransactionCallback {
  static async createTransactionGraphQl(params: any) {
    let { title, amount, message } = params;
    try {
      const payload = await TransactionModel.create({ title, amount, message });
      return payload.status
    }
    catch (err) {
    }
  }
  static async getGraphQl(params: any) {
    let { userId } = params;
    const payload = await TransactionModel.aggregate([
      { $match: { $or: [{ from: convertToMongoID(userId) }, { to: convertToMongoID(userId) }] } },
      {
        $lookup: {
          from: "users",
          localField: "to",
          foreignField: '_id',
          as: "reciever",
        }
      },
      { "$unwind": "$reciever" },
      {
        $lookup: {
          from: "users",
          localField: "from",
          foreignField: '_id',
          as: "sender",
        }
      },
      { $sort: { time: -1 } },
      // { $group: { time: "$time" } },
      { "$unwind": "$sender" },
      { $project: { income: { $cond: { if: { "$eq": ["$from", convertToMongoID(userId)] }, then: 0, else: 1 } }, amount: 1, message: 1, to: 1, title: 1, time: 1, "reciever": { userName: 1 }, "sender": { userName: 1 } } }
    ])
    return payload;
  }

  static async info(req: any, res: Response) {
    try {
      let { userId } = req;
      let { id } = req.body;
      const payload = await TransactionModel.aggregate([
        { $match: { $and: [{ _id: convertToMongoID(id) }, { $or:[{ from: convertToMongoID(userId) }, { to: convertToMongoID(userId) }]}   ] }},
        {
          $lookup: {
            from: "users",
            localField: "to",
            foreignField: '_id',
            as: "reciever",
          }
        },
        { "$unwind": "$reciever" },
        {
          $lookup: {
            from: "users",
            localField: "from",
            foreignField: '_id',
            as: "sender",
          }
        },
        { "$unwind": "$sender" },
        { $project: { income: { $cond: { if: { "$eq": ["$from", convertToMongoID(userId)] }, then: 0, else: 1 } }, amount: 1, message: 1, to: 1, title: 1, time: 1, "reciever": { userName: 1 }, "sender": { userName: 1 } } }
      ])
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  static async get(req: any, res: Response) {
    try {
      let { userId } = req;
      const payload = await TransactionModel.aggregate([
        { $match: { $or: [{ from: convertToMongoID(userId) }, { to: convertToMongoID(userId) }] } },
        {
          $lookup: {
            from: "users",
            localField: "to",
            foreignField: '_id',
            as: "reciever",
          }
        },
        { "$unwind": "$reciever" },
        {
          $lookup: {
            from: "users",
            localField: "from",
            foreignField: '_id',
            as: "sender",
          }
        },
        { $sort: { time: -1 } },
        // { $group: { time: "$time" } },
        { "$unwind": "$sender" },
        { $project: { income: { $cond: { if: { "$eq": ["$from", convertToMongoID(userId)] }, then: 0, else: 1 } }, amount: 1, message: 1, to: 1, title: 1, time: 1, "reciever": { userName: 1 }, "sender": { userName: 1 } } }
      ])
      return res.json({ success: true, data: payload });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async create(req: Request, res: Response) {
    // try {
    //   const { amount, message, title, isIncome, type, from, to, userId } =
    //     req.body;
    //   /**
    //    * 1: Chuyển tiền
    //    * 2: Nhận tiền
    //    * 3: Rút tiền
    //    * 4: Nạp tiền
    //    */
    //   switch (type) {
    //     case 1:
    //       break;

    //     case 2:
    //       break;

    //     case 3:
    //       let bankList = await BankAccountModel.find({ userId: userId });
    //       if (!bankList.length)
    //         return res.json({
    //           success: true,
    //           data: { message: "Bạn chưa liên kết tài khoản ngân hàng" },
    //         });
    //       else {
    //         const userInfo = await UserModel.findOne({ _id: userId });
    //         // console.log(userInfo)
    //         // if (userInfo && amount > userInfo.balance) {
    //         //   return res.json({
    //         //     success: true,
    //         //     data: { message: "Số tiền trong tài khoản không đủ để rút" },
    //         //   });
    //         // } else {
    //         //   // const res = await UserModel.findByIdAndUpdate(
    //         //   //   { userId: userId },
    //         //   //   { balance: userInfo.balance - amount }
    //         //   // );
    //         //   // return res.json({ success: true, data: res });
    //         // }
    //       }
    //       break;

    //     case 4:
    //       break;

    //     default:
    //       break;
    //   }
    //   const payload = await TransactionModel.create({
    //     amount,
    //     message,
    //     title,
    //   });
    //   return res.json({ success: true, data: payload });
    // } catch (err) {
    //   res.status(500).json({ error: err });
    // }
  }
  static async createLink(req: any, res: Response) {
    try {
      const { amount = 0, message = "" } = req.body;
      const { userId } = req;
      let payload = await TransactionModel.create({
        to: userId,
        amount,
        message,
        title: 'Chuyển tiền qua liên kết',
        time: getCurrentTime()
      });
      let transactionId = payload._id;
      let tokenRes = generateToken(transactionId);
      return res.json({ success: true, data: { token: tokenRes } });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async depositLinkInfo(req: Request, res: Response) {
    try {
      const { token } = req.body;
      let isValidToken = await verifyToken(token);
      if (isValidToken) {
        let transactionId = decodeToken(token);
        const resultQuery = await TransactionModel.aggregate(
          [{
            $match: { _id: convertToMongoID(transactionId) },
          },
          {
            $lookup: {
              from: "users",
              localField: "to",
              foreignField: '_id',
              as: "recieveUser",
            },
          },
          { "$unwind": "$recieveUser" },
          { $project: { amount: 1, message: 1, to: 1, "recieveUser": { userName: 1 } } }
          ],
        );
        return res.json({ success: false, data: resultQuery[0] });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async deposit(req: any, res: Response) {
    const { token, message, to, amount } = req.body;
    const handleTransaction = async () => {
      let from = req.userId;
      /* check info sender & recieve */
      let sender = await UserModel.findOne({ _id: from });
      let balanceSender = sender?.balance || 0
      if (from == to) {
        return res.status(200).json({ message: 'Tài khoản nhận phải khác tài khoản gửi' });
      }
      if (balanceSender < amount) {
        return res.status(200).json({ message: 'Tài khoản của bạn không đủ để thực hiện giao dịch' });
      }
      let reciever = await UserModel.findOne({ _id: to });
      /* calculator balance in account */
      let balanceReciever = reciever?.balance || 0
      balanceSender = balanceSender - amount;
      balanceReciever = balanceReciever + amount;
      /* update + write record */
      let balanceSenderPromise = UserModel.findOneAndUpdate({ _id: from }, { balance: balanceSender });
      let balanceRecieverPromise = UserModel.findOneAndUpdate({ _id: to }, { balance: balanceReciever })
      let transactionInfo = {
        amount,
        from,
        to,
        message,
        title: 'Chuyển tiền qua liên kết',
        time: getCurrentTime()
      }
      let transactionPromise = TransactionModel.create({ ...transactionInfo });
      await Promise.all([balanceSenderPromise, balanceRecieverPromise, transactionPromise]);
      res.status(200).json({ success: true });
    }
    if (token) {
      let isValidToken = await verifyToken(token);
      if (isValidToken) {
        handleTransaction();
      }
      else {
        return res.status(200).json({ message: 'Hết thời gian chuyển tiền' });
      }
      return;
    }
    handleTransaction();

  }

  static async filterMoneyFlow(req: Request, res: Response) { }

  static async filterStatus(req: Request, res: Response) { }

  static async filterMonth(req: Request, res: Response) { }
}
