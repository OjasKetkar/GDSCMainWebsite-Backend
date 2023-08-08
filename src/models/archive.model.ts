import { Schema, model } from "mongoose";

const archiveModel = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  year:{ type: String, required: true }
});

model("archives", archiveModel);