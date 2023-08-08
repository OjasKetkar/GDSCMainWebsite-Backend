import { MulterRequestSingle } from "../../middlewares/multer";
import { uploadFromBuffer } from "../../services/cloudinary.service";
import { Member } from "../../models/member.model";
import { INewMember,IEditMember } from "./team.interfaces";
import { Request, Response } from "express";

export const createMember = async (req: MulterRequestSingle, res: any) => {
  const {
    fullname,
    email,
    linkedInProfile,
    githubProfile,
    role,
    position,
    mobileNumber,
    year,
    team,
  }: INewMember = req.body;
  const buffer = req.file?.buffer;
  try {
    const memberPresent = await Member.findOne({ email });
    if (memberPresent) {
      res.status(400).json({ message: "Member Already Exists" });
    } else {
      const result: any = await uploadFromBuffer(buffer, "team");
      const image = result.url;

      let newMember = await new Member({
        fullname,
        email,
        linkedInProfile,
        githubProfile,
        role,
        position,
        mobileNumber,
        image,
        year,
        team,
      }).save();

      if (newMember) res.status(200).json({ message: "Team Member Added" });
      else res.status(400).json({ message: "something went wrong" });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "something went wrong", error: e });
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const { year } = req.params;
    const lead = await Member.find({ role: "Lead", year });
    const managers = await Member.find({ role: "Manager", year });
    const heads = await Member.find({ role: "Head", year });
    const web = await Member.find({ team: "Web", year });
    const android = await Member.find({ team: "Android", year });
    const flutter = await Member.find({ team: "Flutter", year });
    const management = await Member.find({ team: "Management", year });
    const multimedia = await Member.find({ team: "Multimedia", year });
    res.status(200).json({
      lead,
      managers,
      heads,
      web,
      android,
      flutter,
      management,
      multimedia,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Something Went Wrong", error: e });
  }
};




export const deleteMember = async (req:Request, res:Response) => {
    const { id } = req.body;
    try {
      const deleted = await Member.findByIdAndDelete(id);
      if(deleted) res.status(200).json({ message: "Member Deleted" });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Something Went Wrong", error: e });

    }
};

export const getMember = async(req:Request,res:Response)=>{
    const {id} = req.params
    try {
        const memberDetails = await Member.findById(id);
        if(memberDetails) res.status(200).json({ message: "Member Found",memberDetails });
        else res.status(400).json({ message: "Member Not Found" });
    } catch (e) {
        console.error(e);
      res.status(400).json({ message: "Something Went Wrong", error: e });
    }
}

export const editMember = async(req:MulterRequestSingle,res:any)=>{
    const {
        id,
        fullname,
        email,
        linkedInProfile,
        githubProfile,
        role,
        position,
        mobileNumber,
        year,
        team,
        image,
        imageIsUpdated
      }: IEditMember = req.body;
      try {
          let newImage
          const buffer = req.file?.buffer;
          let check 
          imageIsUpdated==="true"?check = true:check = false
          
        if(check && buffer){
            const result: any = await uploadFromBuffer(buffer, "team");
            newImage = result.url;
        }

        const updated = await Member.findByIdAndUpdate(id,{
            fullname,
            email,
            linkedInProfile,
            githubProfile,
            role,
            position,
            mobileNumber,
            image:newImage?newImage:image,
            year,
            team,
        })

        if(updated) res.status(200).json({ message: "Member Updated" });
        else res.status(400).json({ message: "Member Not Found" });

      } catch (e) {
        console.error(e);
        res.status(400).json({ message: "Something Went Wrong", error: e });
      }
}
