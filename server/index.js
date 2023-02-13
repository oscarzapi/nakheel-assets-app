import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import sqlRoutes from './routes/sql.js'


/* CONFIGURATION */
dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())


/* ROUTES */

app.use('/sql-requests', sqlRoutes)


const PORT = parseInt(process.env.SERVER_PORT) || 9000
app.listen(PORT, () => console.log(`Server Port: ${PORT}`))