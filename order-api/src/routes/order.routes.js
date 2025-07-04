import {Router} from 'express'
import * as controller from '../controller/order.controller.js'

const router = Router()

router.post('/place', controller.order)

export default router