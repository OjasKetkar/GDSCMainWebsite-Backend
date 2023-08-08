import { Router } from "express";
const router = Router()

import teamRouter from './team'
import authRouter from './auth'
import eventRouter from './events'
import projectRouter from './projects'


router.use('/team',teamRouter)
router.use('/auth',authRouter)
router.use('/events',eventRouter)
router.use('/projects',projectRouter)

export default router;