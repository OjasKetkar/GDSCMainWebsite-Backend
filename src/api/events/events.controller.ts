import { Request, Response } from "express";
import { Event } from "../../models/event.model";
import {  MulterRequestSingle } from "../../middlewares/multer";
// import { MulterRequestMultiple } from "../../middlewares/multer";
import { uploadFromBuffer } from "../../services/cloudinary.service";

export const newEvent = async (req: MulterRequestSingle, res: any) => {
  const {
    title,
    venue,
    date,
    description,
    endDate,
    duration,
    registrationLink,
    slots,
    day,
    slot_start,
    slot_end,
    isFeatured,
    status
  } = req.body;
  const buffer = req.file.buffer;
  try {
    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      res.status(300).json({ message: "Event Already Exists" });
    } else {
      const result: any = await uploadFromBuffer(buffer, "events");
      const image = result.url;
      let schedule = [];
      let days = [];
      let slotsOfEvent = [];
      let slotStart = [];
      let slotEnd = [];
      if (Array.isArray(day)) {
        days = day;
      } else {
        days.push(day);
      }
      if (Array.isArray(slots)) {
        slotsOfEvent = slots;
      } else {
        slotsOfEvent.push(slots);
      }
      if (Array.isArray(slot_start)) {
        slotStart = slot_start;
        slotEnd = slot_end;
      } else {
        slotStart.push(`${slot_start}`);
        slotEnd.push(`${slot_end}`);
      }
      var n = 0;
      for (var i = 0; i < days.length; i++) {
        let date = days[i];
        let slots1 = [];
        for (var k = 0; k < parseInt(slotsOfEvent[i]); k++) {
          slots1.push({
            start: slotStart[n],
            end: slotEnd[n],
          });
          n++;
        }
        schedule.push({
          date,
          slots: slots1,
        });
      }
      let newEvent = await new Event({
        title,
        venue,
        date,
        description,
        duration,
        registrationLink,
        endDate,
        updatedAt: new Date(),
        // images,
        schedule,
        thumbnail:image,
        isFeatured,
        status
      }).save();
      res.status(200).json({ message: "New Event Created", newEvent });
    }
  } catch (e) {
    console.error(e);
    res.status(300).json({ message: "Something Went Wrong" });
  }
};

export const getEvents = async (req:Request, res:Response) => {
    try {
      const events = await Event.find();
      if (!events) res.status(300).json({ message: "No Events Found" });
    else{
      res.status(200).json({ message: "Fetched Events", events });        
    }
    } catch (e) {
      console.error(e);
      res.status(300).json({ message: "something went wrong" });
    }
  };


  export const deleteEvent = async (req:Request, res:Response) => {
    const { id } = req.body;
    try {
      const deleted = await Event.findByIdAndDelete(id);
      if(deleted) res.status(200).json({ message: "Event has been deleted" });
      else res.status(300).json({ message: "something went wrong" });
    } catch (e) {
      console.error(e);
      res.status(300).json({ message: "something went wrong" });
    }
  };
  
  export const getEvent = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
      let response = await Event.findById(id);
      if(response) res.status(200).send({message:"Fetched Event",eventDetails:response})
    } catch (error) {
      console.log(error);
      res.status(300).json({ message: "something went wrong" });
    }
  };


 export const updateEvent = async (req:MulterRequestSingle, res:any) => {
    const {
      id,
      title,
      venue,
      date,
      description,
      endDate,
      duration,
      registrationLink,
      slots,
      day,
      slot_start,
      slot_end,
      isFeatured,
      status,
      thumbnail,
      thumbNailUpdated
    } = req.body;
    const buffer = req.file.buffer;
    try {
    let check 
    let image
    thumbNailUpdated==="true"?check = true:check = false
    if(check && buffer){
        const result: any = await uploadFromBuffer(buffer, "events");
        image = result.url;
    }


    let schedule = [];
      let days = [];
      let slotsOfEvent = [];
      let slotStart = [];
      let slotEnd = [];
      if (Array.isArray(day)) {
        days = day;
      } else {
        days.push(day);
      }
      if (Array.isArray(slots)) {
        slotsOfEvent = slots;
      } else {
        slotsOfEvent.push(slots);
      }
      if (Array.isArray(slot_start)) {
        slotStart = slot_start;
        slotEnd = slot_end;
      } else {
        slotStart.push(`${slot_start}`);
        slotEnd.push(`${slot_end}`);
      }
      var n = 0;
      for (var i = 0; i < days.length; i++) {
        let date = days[i];
        let slots1 = [];
        for (var k = 0; k < parseInt(slotsOfEvent[i]); k++) {
          slots1.push({
            start: slotStart[n],
            end: slotEnd[n],
          });
          n++;
        }
        schedule.push({
          date,
          slots: slots1,
        });
      }


     
      let updateEvent = {
        title,
        venue,
        date,
        description,
        duration,
        registrationLink,
        endDate,
        updatedAt: new Date(),
        // images,
        schedule,
        thumbnail:check?image:thumbnail,
        isFeatured,
        status
      };
      let response = await Event.findByIdAndUpdate(id, updateEvent);
      if(response) res.status(200).json({message:"Event Updated"})
      else res.status(400).json({ message: "something went wrong" });
    } catch (error) {
      console.error(error);
      res.status(300).json({ message: "something went wrong" });
    }
  };



