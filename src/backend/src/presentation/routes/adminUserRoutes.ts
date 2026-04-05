import express from 'express'
import { createUserController } from '@/presentation/controllers/adminUserController'

const router = express.Router()

router.post('/users', createUserController)

export default router