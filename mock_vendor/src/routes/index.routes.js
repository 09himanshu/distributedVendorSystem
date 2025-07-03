import { Router } from 'express'
import vendorRoutes from './vendor.routes.js'

const indexRouter = Router()

indexRouter.use('/vendor', vendorRoutes)

export default indexRouter