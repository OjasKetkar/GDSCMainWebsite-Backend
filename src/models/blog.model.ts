import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category : { type: String, required: true },
  author:{ type: String, required: true },
  author_image: { type: String, required: true },
  tags: [{ type: String}],
  image: { type: String, required: true },
  publish_date:  { type: Date, required: true },
  blog_link : { type: String, required: true },
  isMostViewed : { type: Boolean, default:false },
  likes : {type: Number, default:0}
});

export const Blog = model("blogs", blogSchema);