import {Router} from 'express'
import * as controller from '../vendor/vendor.js'

const router = Router()

router.get('/AStock', controller.vendorAStock)
router.get('/BStock', controller.vendorBStock)

export default router