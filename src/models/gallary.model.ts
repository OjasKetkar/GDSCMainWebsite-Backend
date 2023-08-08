import { Schema, model } from "mongoose";

const gallarySchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  year:{ type: String, required: true }
});

model("gallary", gallarySchema);