import { Blog } from "../../models/blog.model";
import { Response, Request } from "express";
import { uploadFromBuffer } from "../../services/cloudinary.service";
import { MulterRequestSingle } from "../../middlewares/multer";

export const newBlog = async (req: MulterRequestSingle, res: any) => {
  const {
    title,
    description,
    category,
    author,
    author_image,
    tags,
    image,
    publish_date,
    blog_link,
    isMostViewed,
    likes,
  } = req.body;
  const buffer = req.file?.buffer;
  try {
    const existingBlog = await Blog.findOne({ title });

    if (existingBlog) {
      res.status(400).json({ message: "Project Already Exists" });
    } else {
      const result: any = await uploadFromBuffer(buffer, "blogs");
      const image = result.url;
      let newBlog = await new Blog({
        title,
        description,
        category,
        author,
        author_image,
        tags,
        image,
        publish_date,
        blog_link,
      }).save();

      if (newBlog) res.status(200).json({ message: "Blog Added" });
      else res.status(400).json({ message: "Something Went Wrong" });
    }
  } catch (e) {
    console.error(e);
    res.status(300).json({ message: "Something Went Wrong" });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({});
    if (blogs)
      res.status(200).json({ message: "Blogs Fetched", blogs });
    else res.status(400).json({ message: "Something Went Wrong" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const viewBlogs = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) res.status(200).json({ message: "Blogs Fetched", blog });
    else res.status(400).json({ message: "Something Went Wrong" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const deleted = await Blog.findByIdAndDelete(id);
    if (deleted) res.status(200).json({ message: "Blog Deleted" });
    else res.status(400).json({ message: "Something Went Wrong" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const updateBlog = async (req: MulterRequestSingle, res: any) => {
  const {
    id,
    title,
    category,
    description,
    author,
    author_image,
    tags,
    image,
    updated_image,
    publish_date,
    blog_link,
    
  } = req.body;
  const buffer = req.file.buffer;
  try {
    let existingBlog = await Blog.findById(id);
    if (!existingBlog)
      res.status(400).json({ message: "Something Went Wrong" });
    else {
      let check;
      updated_image === "true" ? (check = true) : (check = false);
      let image;
      if (check && buffer) {
        const result: any = uploadFromBuffer(buffer, "project");
        image = result.url;
      }
      let updatedBlog = {
        id,
        title,
        category,
        description,
        author,
        author_image,
        tags,
        publish_date,
        blog_link,
        
        image: check ? image : image,
      };

      const updated = await Blog.findByIdAndUpdate(id, updatedBlog);

      if (updated) res.status(200).json({ message: "Blog Updated" });
      else res.status(400).json({ message: "Something Went Wrong" });
    }
  } catch (e) {
    console.error(e);
    res.status(300).json({ message: "something went wrong" });
  }
};
