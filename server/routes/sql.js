import express from 'express'
import {getSqlRequests} from '../controllers/sqlrequests.js'


const router = express.Router()
router.get('/', getSqlRequests)

export default router
