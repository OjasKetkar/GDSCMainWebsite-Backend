import { Router } from "express";
import { upload } from "../../middlewares/multer";
import * as controllers from './team.controller'
import isAdmin from "../../middlewares/isAdmin";
const router = Router()

router.post('/addMember',isAdmin,upload.single('image'),controllers.createMember)
router.get('/getTeam/:year',isAdmin,controllers.getTeam)
router.delete('/deleteMember',isAdmin,controllers.deleteMember)
router.get('/getMember/:id',isAdmin,controllers.getMember)
router.put('/editMember',isAdmin,upload.single('image'),controllers.editMember)


export default router;


// example file upload to cloudinary

// async(req:MulterRequestSingle,res:any)=>{
//     try {
//         const buffer = req.file?.buffer
//         let result = await uploadFromBuffer(buffer,"test");
//         res.send(result)
//     } catch (error) {
//         console.log(error)
//     }
// }

//   export const multipleUploads = async(req:MulterRequestMultiple,res:any)=>{
//     try {
//         const buffers = req.files
//         const images:string[] = []
//         for (const file of buffers){
//             const result: any = await uploadFromBuffer(file.buffer, "events");
//             images.push(result.url)
//         }
//     } catch (error) {  
//         console.log(error)
//         res.status(400).send({message:"Something Went Wrong"})
//     }
//   }