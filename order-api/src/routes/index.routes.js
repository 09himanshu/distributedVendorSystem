import {Router} from 'express'
import orderModels from './order.routes.js'

const router = Router()

router.use('/order', orderModels)

export default router
