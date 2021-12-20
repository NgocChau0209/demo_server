// import { saveStorage, getStorage } from './module/function';
import express, { Request, response, Response } from "express";
import connectDatabase from "./utils/connectDatabase";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { BankServiceRouter, TransactionRouter, UserRouter } from "./routes";
import BankAccountRoute from "./routes/BankAccount";
import { TransactionModel } from './models';
import TransactionCallback from './controller/Transaction';
const bodyParser = require("body-parser");

const { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query{
    getTransaction(userId: String!): [Transaction]
  }
  type Mutation{
    createTransaction(title: String!, amount: Float!, message: String!): Transaction
  }
  type Transaction{
    title: String
    amount: Float
    message: String
  }
`)

var root = {
  getTransaction: TransactionCallback.getGraphQl,
  createTransaction: TransactionCallback.createTransactionGraphQl
}

require("dotenv").config();

const app = express();
const PORT = parseInt(<string>process.env.PORT, 10) || 9888;


connectDatabase();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// saveStorage("USER", { phone: '3763325944' })
// getStorage("USER").then(res => console.log(res))

// routes api
app.use("/api/user", UserRouter);
app.use("/api/service/bank", BankServiceRouter);
app.use("/api/bank-account", BankAccountRoute);
app.use("/api/transaction", TransactionRouter);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});


// const OneSignal = require('onesignal-node');
// const client = new OneSignal.Client(process.env.NOTI_APP_ID, process.env.NOTI_API_KEY);

// const notification = {
//   "app_id": process.env.NOTI_APP_ID,
//   "included_segments": ["Subscribed Users"],
//   "data": {"foo": "bar"},
//   "contents": {"en": "English Message"}
// }

// client.createNotification(notification)
//   .then((response: any) => {
//     console.log('res', response.body);
//   })
//   .catch((e: any) => {
//     console.log('error', e);
//   });

// client.viewNotifications().then((response: any)=>{
  
// })