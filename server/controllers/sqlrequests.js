import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();
/* SQL SERVER SETUP */
const sqlConfig = {
  user: process.env.SQL_SERVER_USERNAME,
  password: process.env.SQL_SERVER_PASSWORD,
  database: process.env.SQL_SERVER_DATABASE,
  server: process.env.SQL_SERVER_URL,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getSqlRequests = async (req, res) => {
  try {
    const { page, pageSize, tcode } = req.query;
    await sql.connect(sqlConfig, function (err) {
      // create Request object
      var request = new sql.Request();
      var query = `select distinct * from YD_REGISTER_LOG where tcode like '%${tcode}%'`;
      // query to the database and get the records

      request.query(query, function (err, recordset) {
        if (err) console.log(err);
        let data = recordset.recordset;
        console.log(data);
        if (tcode == "") data = [];
        //const dataFiltered = recordset.recordset.slice((page)*pageSize, (page+1)*pageSize)
        console.log(data, page, pageSize, tcode);

        const total = data.length;
        const columnsToFilterBy = [
          "tcode",
          "DocNo",
          "TotalTranAmount",
          "PaidAmount",
          "Comment",
        ];
        const columns = [];
        //const columnsAux = Object.keys(data[0]).filter(column => columnsToFilterBy.includes(column))
        columnsToFilterBy.map((column) =>
          columns.push({ field: column, headerName: column, flex: 1 })
        );

        // send records as a response
        res.status(200).send({ data, total, columns, tcode });
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateComments = async (req, res) => {
  try {
  } catch (error) {}
  try {
    const { keyToUpdateComment, comment } = req.query;
    await sql.connect(sqlConfig, function (err) {
      console.log(keyToUpdateComment, comment);

      // create Request object
      var request = new sql.Request();
      var query = `update YD_REGISTER_LOG set comment = '${comment}' where tcode like '%${keyToUpdateComment}%'`;
      // query to the database and get the records

      request.query(query, function (err, recordset) {
        res
          .status(200)
          .send({ message: `Updated values for ${keyToUpdateComment}` });
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getData = async (req, res) => {
  try {
    const { email } = req.query;
    await sql.connect(sqlConfig, function (err) {
      // create Request object
      var requestUserScope = new sql.Request();
      var queryUserScope = `select email, asset_access, tenant_access from nakheel_app_access where email like '%${email}%'`;
      let dataUserScope = []
      
      // query to the database and get the records

      requestUserScope.query(queryUserScope, function (err, recordset) {
        if (err) console.log(err);
        dataUserScope = recordset.recordset[0];
        if (email == "") dataUserScope = [];
        //const dataFiltered = recordset.recordset.slice((page)*pageSize, (page+1)*pageSize)
        console.log(dataUserScope);
        // send records as a response
        //res.status(200).send({dataUserScope });
      });

      var requestSalesData = new sql.Request();
      var querySalesData = `select * from RG_Sales`;
      if (dataUserScope !=={}
       && dataUserScope.asset_access !== 'All'
        && dataUserScope.tenant_access !== 'All'){
          //querySalesData = `select * from RG_Sales where Name like '%${asset}%' and Tenant_name like '%${tenant}%'`
     }
      let salesData = []

      requestSalesData.query(querySalesData, function (err, recordset) {
        if (err) console.log(err);
        if (dataUserScope == {}) salesData = [];
        salesData = recordset.recordset
        //const dataFiltered = recordset.recordset.slice((page)*pageSize, (page+1)*pageSize)
        //console.log(salesData);
        // send records as a response
        res.status(200).send({salesData });
      });


    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



