import { Router } from 'express'
import locationAuth from './authRoutes.js'
import { locationUser } from './userRoutes.js'


const router = Router()

router.use("/api/auth", locationAuth)
router.use("/api/user", locationUser)

export default router;