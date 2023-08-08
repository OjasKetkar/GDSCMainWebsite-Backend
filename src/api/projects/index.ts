import { Router } from "express";
import { upload } from "../../middlewares/multer";
import * as controllers from './project.controller'
const router = Router()

router.post('/newProject',upload.single('image'),controllers.newProject)
router.get('/getProjects',controllers.getProjects)
router.get('/getProject/:id',controllers.viewProject)
router.delete('/deleteProject',controllers.deleteProject)
router.put('/updateProject',upload.single('image'),controllers.updateProject)


export default router