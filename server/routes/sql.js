import express from 'express'
import {getSqlRequests, updateComments, getData} from '../controllers/sqlrequests.js'


const router = express.Router()
router.get('/', getSqlRequests)
router.get('/updated-comments', updateComments)
router.get('/data', getData)



export default router
