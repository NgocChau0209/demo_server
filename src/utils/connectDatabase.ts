import mongoose from "mongoose";
require("dotenv").config();

const connectDatabase = () => {
  mongoose.Promise = require("bluebird");

  mongoose
    .connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URLDEV || process.env.DB_URL}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection created");
    })
    .catch((err) => {
      console.log("Error:/n", err);
    });
};

export default connectDatabase;
