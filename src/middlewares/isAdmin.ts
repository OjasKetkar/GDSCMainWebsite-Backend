import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

const isAdmin = async (req:any, res:Response, next:NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Access Denied, No token provided");
    }
    try {
      const decoded:any = jwt.verify(token, "THISISSECRET");
      const rootUser = await User.findById(decoded._id);
      if (rootUser) {
        req.user = rootUser;
        next();
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  };


export default isAdmin
  