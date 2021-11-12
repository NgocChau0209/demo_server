import express, { Request, Response } from "express";
import connectDatabase from "./utils/connectDatabase";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { BankServiceRouter, TransactionRouter, UserRouter } from "./routes";
import BankAccountRoute from "./routes/BankAccount";
const bodyParser = require("body-parser");

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

// routes api
app.use("/api/user", UserRouter);
app.use("/service/bank",BankServiceRouter);
app.use("/api/bank-account",BankAccountRoute);
app.use("/api/transaction", TransactionRouter);

app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const personSchema = Schema({
//   _id: Schema.Types.ObjectId,
//   name: String,
//   age: Number,
//   stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
// });

// const storySchema = Schema({
//   author: { type: Schema.Types.ObjectId, ref: "Person" },
//   title: String,
//   fans: [{ type: Schema.Types.ObjectId, ref: "Person" }],
// });

// const Story = mongoose.model("Story", storySchema);
// const Person = mongoose.model("Person", personSchema);

// const author = new Person({
//   _id: new mongoose.Types.ObjectId(),
//   name: "Ian Fleming",
//   age: 50,
// });
// const story1 = new Story({
//   title: 'Casino Royale',
//   author: author._id    // assign the _id from the person
// });

// story1.save();