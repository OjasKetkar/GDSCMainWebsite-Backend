import { Router } from "express";
import { upload } from "../../middlewares/multer";
import * as controllers from './blog.controller'
const router = Router()

router.post('/newBlog',upload.single('image'),controllers.newBlog)
router.get('/getBlogs',controllers.getBlogs)
router.get('/getBlogs/:id',controllers.viewBlogs)
router.delete('/deleteBlog',controllers.deleteBlog)
router.put('/updateBlog',upload.single('image'),controllers.updateBlog)


export default router