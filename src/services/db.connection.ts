import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGODB_URI || "";

export const connect = async()=>{
    mongoose.set('strictQuery', false);
    await mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch((err) => {
    console.log("CONNECTION TO DB FAILED!");
    console.log(err);
  });
}
