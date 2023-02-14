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

const getTcodes = () => {
  var tcodes =[]

        // get Tcodes 
        var requestTcodes = new sql.Request();
        var queryTcodes = 'select distinct tcode from YD_REGISTER_LOG'
        // query to the database and get the records
        requestTcodes.query(queryTcodes, function (err, result) {
            
          if (err) {console.log(err)}
          result.recordset.map(record => tcodes.push(record.tcode.trim()))
        });
        return tcodes

}


export const getSqlRequests = async(req, res) => {
    try {
      const {page = 1, pageSize = 20, sort = null, search = ""} = req.query
      await sql.connect(sqlConfig, function (err) {
        
        // create Request object
        var request = new sql.Request();
        var query = 'select distinct * from YD_REGISTER_LOG'
        // query to the database and get the records

        const generateSort = () => {
          const sortParsed = JSON.parse(sort)
          const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1)
          }
          return sortFormatted
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {}


        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)
            const data = recordset.recordset
            // send records as a response
            res.status(200).send(data)
        })
    }); 

    } catch (error) {
        res.status(404).json({message:error.message})
    }
} 