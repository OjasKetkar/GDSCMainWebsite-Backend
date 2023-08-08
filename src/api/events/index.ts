import { Router } from "express";
const router = Router()
import * as controllers from './events.controller'
import { upload } from "../../middlewares/multer";

router.post('/newEvent',upload.single('file'),controllers.newEvent)
router.get('/getEvents',controllers.getEvents)
router.delete('/deleteEvent',controllers.deleteEvent)
router.put('/editEvent',upload.single('file'),controllers.updateEvent)
router.get('/getEvent/:id',controllers.getEvent)
// router.post('/',upload.array('images'),controllers.multipleUploads)

export default router;