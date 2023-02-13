import sql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()
/* SQL SERVER SETUP */
const PORT = parseInt(process.env.SERVER_PORT) || 9000


const sqlConfig = {
    user: process.env.SQL_SERVER_USERNAME,
    password: process.env.SQL_SERVER_PASSWORD,
    database: process.env.SQL_SERVER_DATABASE,
    server: process.env.SQL_SERVER_URL,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }


export const getSqlRequests = async(req, res) => {
    try {
        await sql.connect(sqlConfig)
  const result = await sql.query`select * from YD_REGISTER_LOG`
  console.dir(result)
  res.status(200).send({result:result})

    } catch (error) {
        res.status(404).json({message:error.message})
    }
} 