import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  projectTitle: { type: String, required: true },
  domain: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  githubLink: { type: String, required: true },
  videoLink: { type: String },
  projectLink: { type: String },
  images: [{ type: String }],
  thumbnail: { type: String, required: true },
});

export const Project = model("projects", projectSchema);
