import express from 'express'
import {getSqlRequests, updateComments} from '../controllers/sqlrequests.js'


const router = express.Router()
router.get('/', getSqlRequests)
router.get('/updated-comments', updateComments)


export default router
