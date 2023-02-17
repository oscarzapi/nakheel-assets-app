import sql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()
/* SQL SERVER SETUP */
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
      const {page, pageSize, tcode} = req.query
      await sql.connect(sqlConfig, function (err) {
        
        // create Request object
        var request = new sql.Request();
        var query = `select distinct * from YD_REGISTER_LOG where tcode like '%${tcode}%'`
        // query to the database and get the records

        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)
            let data = recordset.recordset
            if (tcode =='') data =[]
            //const dataFiltered = recordset.recordset.slice((page)*pageSize, (page+1)*pageSize)
            console.log(data, page, pageSize, tcode)

            const total = data.length
            const columnsToFilterBy = ['tcode', 'DocNo', 'TotalTranAmount', 'PaidAmount', 'Comment']
    const columns = []
    //const columnsAux = Object.keys(data[0]).filter(column => columnsToFilterBy.includes(column))
    columnsToFilterBy.map(column => columns.push({field:column, headerName: column, flex:1}))
            
            // send records as a response
            res.status(200).send({data, total, columns, tcode})
        })
    }); 

    } catch (error) {
        res.status(404).json({message:error.message})
    }
} 