import { Schema, model } from "mongoose";

const memberSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  githubProfile: { type: String, required: true },
  linkedInProfile: { type: String, required: true },
  mobileNumber: { type: Number, required: false },
  role: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: String, required: true },
  year: { type: Number, required: true },
  image: { type: String, required: true },
});

export const Member = model("members", memberSchema);


