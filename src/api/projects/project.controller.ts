import { Project } from "../../models/project.model";
import { Response, Request } from "express";
import { uploadFromBuffer } from "../../services/cloudinary.service";
import { MulterRequestSingle } from "../../middlewares/multer";

export const newProject = async (req: MulterRequestSingle, res: any) => {
  const {
    projectTitle,
    domain,
    description,
    shortDescription,
    githubLink,
    videoLink,
    projectLink,
  } = req.body;
  const buffer = req.file?.buffer;
  try {
    const existingProject = await Project.findOne({ projectTitle });

    if (existingProject) {
      res.status(400).json({ message: "Project Already Exists" });
    } else {
      const result: any = await uploadFromBuffer(buffer, "projects");
      const thumbnail = result.url;
      let newProject = await new Project({
        projectTitle,
        domain,
        description,
        shortDescription,
        githubLink,
        videoLink,
        projectLink,
        thumbnail,
      }).save();

      if (newProject) res.status(200).json({ message: "Project Added" });
      else res.status(400).json({ message: "Something Went Wrong" });
    }
  } catch (e) {
    console.error(e);
    res.status(300).json({ message: "Something Went Wrong" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    if (projects)
      res.status(200).json({ message: "Projects Fetched", projects });
    else res.status(400).json({ message: "Something Went Wrong" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const viewProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) res.status(200).json({ message: "Projects Fetched", project });
    else res.status(400).json({ message: "Something Went Wrong" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const deleted = await Project.findByIdAndDelete(id);
    if (deleted) res.status(200).json({ message: "Project Deleted" });
    else res.status(400).json({ message: "Something Went Wrong" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const updateProject = async (req: MulterRequestSingle, res: any) => {
  const {
    id,
    projectTitle,
    domain,
    description,
    shortDescription,
    githubLink,
    videoLink,
    projectLink,
    thumbnailUpdated,
    thumbnail,
  } = req.body;
  const buffer = req.file.buffer;
  try {
    let existingProject = await Project.findById(id);
    if (!existingProject)
      res.status(400).json({ message: "Something Went Wrong" });
    else {
      let check;
      thumbnailUpdated === "true" ? (check = true) : (check = false);
      let image;
      if (check && buffer) {
        const result: any = uploadFromBuffer(buffer, "project");
        image = result.url;
      }
      let updatedProject = {
        id,
        projectTitle,
        domain,
        description,
        shortDescription,
        githubLink,
        videoLink,
        projectLink,
        thumbnail: check ? image : thumbnail,
      };

      const updated = await Project.findByIdAndUpdate(id, updatedProject);

      if (updated) res.status(200).json({ message: "Project Updated" });
      else res.status(400).json({ message: "Something Went Wrong" });
    }
  } catch (e) {
    console.error(e);
    res.status(300).json({ message: "something went wrong" });
  }
};
