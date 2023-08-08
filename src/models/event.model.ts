import { Schema, model } from "mongoose";
const eventSchema = new Schema({
  title: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  registrationLink: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true },
  endDate: { type: Date, required: true },
  images: [{ type: String }],
  thumbnail: { type: String, required: true },
  status : {type:String},
  isFeatured : { type: Boolean, default:false },
  schedule: [
    {
      date: {
        type: String,
      },
      slots: [
        {
          start: {
            type: String,
          },
          end: {
            type: String,
          },
        },
      ],
    },
  ],
});

export const Event = model("events", eventSchema);
