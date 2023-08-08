import { v2 as cloudinary } from 'cloudinary'
import streamifier from "streamifier"
import dotenv from "dotenv"

dotenv.config();

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export const uploadFromBuffer = (buffer:Buffer,path:string) => {
    
    return new Promise((resolve, reject) => {

      let upload_stream = cloudinary.uploader.upload_stream(
       {
         folder:path
       },
       (error: any, result: any) => {
         if (result) {
           resolve(result);
         } else {
           reject(error);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(upload_stream);
    });
 
 };

export default cloudinary;
  
