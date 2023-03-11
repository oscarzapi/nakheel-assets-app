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
    const { userEmail, dateMode } = req.query;
    
    
    await sql.connect(sqlConfig, function (err) {
      // create Request object
      var requestSalesData = new sql.Request();

      // query to the database and get the records
      /* var querySalesData = `DECLARE @QUERY VARCHAR(2000)
      DECLARE @USER_NAME VARCHAR(2000)
      DECLARE @ASSET_ACCESS VARCHAR(2000)
      DECLARE @TENANT_ACCESS VARCHAR(2000)
      
      SET @QUERY = 'select top 100 *
      from dbo.RG_Sales rg'
      
      SET @USER_NAME = (select email from dbo.nakheel_app_access where email like '%${email}%')
      SET @ASSET_ACCESS = (select  asset_access from dbo.nakheel_app_access where email like '%${email}%')
      SET @TENANT_ACCESS = (select tenant_access from dbo.nakheel_app_access where email like '%${email}%')
      
       set @QUERY = 
       case 
       when @ASSET_ACCESS != 'All' and @TENANT_ACCESS != 'All' then 'select top 100 rg.*
      from dbo.RG_Sales rg
      join nakheel_app_access naa on naa.asset_access = rg.Name and naa.tenant_access = rg.[Tenant Name]
      and naa.email like ''%${email}%'''
      when @ASSET_ACCESS != 'All' and @TENANT_ACCESS = 'All'
       then 'select top 100 rg.*
      from dbo.RG_Sales rg
      join nakheel_app_access naa on naa.asset_access = rg.Name 
      and naa.email like ''%${email}%'''
      else 'select top 100 *
      from dbo.RG_Sales rg' end
      
      EXEC( @QUERY)`; */
      var querySalesData = `DECLARE @QUERY VARCHAR(2000)
      DECLARE @USER_NAME VARCHAR(2000)
      DECLARE @ASSET_ACCESS VARCHAR(2000)
      DECLARE @TENANT_ACCESS VARCHAR(2000)
      
      
      SET @USER_NAME = (select email from dbo.nakheel_app_access where email like '%${userEmail}%')
      SET @ASSET_ACCESS = (select  asset_access from dbo.nakheel_app_access where email like '%${userEmail}%')
      SET @TENANT_ACCESS = (select tenant_access from dbo.nakheel_app_access where email like '%${userEmail}%')
      
       set @QUERY = 
       case 
       when @ASSET_ACCESS != 'All' and @TENANT_ACCESS != 'All' then 'select  
       Name
       ,[Tenant Name]
       ,CAST(DATEADD(${dateMode}, DATEDIFF(${dateMode}, 0, rg.[Sale Date]), 0) AS DATE) AS ${dateMode}
      ,sum(rg.[Net Sales]) as sales
      from dbo.RG_Sales rg
      join nakheel_app_access naa on naa.asset_access = rg.Name and naa.tenant_access = rg.[Tenant Name]
      and naa.email like ''%${userEmail}%''
      group by Name
       ,[Tenant Name]
       ,CAST(DATEADD(${dateMode}, DATEDIFF(${dateMode}, 0, rg.[Sale Date]), 0) AS DATE)
      order by Name
       ,[Tenant Name]
       ,CAST(DATEADD(${dateMode}, DATEDIFF(${dateMode}, 0, rg.[Sale Date]), 0) AS DATE)'
      when @ASSET_ACCESS != 'All' and @TENANT_ACCESS = 'All'
       then 'select 
       Name
       ,[Tenant Name]
       ,CAST(DATEADD(${dateMode}, DATEDIFF(${dateMode}, 0, rg.[Sale Date]), 0) AS DATE) AS ${dateMode},
      sum(rg.[Net Sales]) as sales from dbo.RG_Sales rg
      join nakheel_app_access naa on naa.asset_access = rg.Name
      and naa.email like ''%${userEmail}%''
      group by Name
       ,[Tenant Name]
       ,CAST(DATEADD(${dateMode}, DATEDIFF(${dateMode}, 0, rg.[Sale Date]), 0) AS DATE)
      order by CAST(DATEADD(${dateMode}, DATEDIFF(${dateMode}, 0, rg.[Sale Date]), 0) AS DATE)'
      else 'select 
       Name
       ,[Tenant Name]
       , CAST(DATEADD(${dateMode}, DATEDIFF(${dateMode}, 0, rg.[Sale Date]), 0) AS DATE) AS ${dateMode},
      sum(rg.[Net Sales]) as sales from dbo.RG_Sales rg
      group by Name
       ,[Tenant Name]
       ,CAST(DATEADD(${dateMode}, DATEDIFF(${dateMode}, 0, rg.[Sale Date]), 0) AS DATE)
      order by Name
       ,[Tenant Name]
       ,CAST(DATEADD(${dateMode}, DATEDIFF(${dateMode}, 0, rg.[Sale Date]), 0) AS DATE)' end
      
      EXEC( @QUERY)
      `

      let salesDataAux = []
      let salesData = []


      requestSalesData.query(querySalesData, function (err, recordset) {
        if (err) console.log(err);

        //Get all the sales
        salesDataAux = recordset.recordset
        
        salesDataAux.forEach(value => {
          salesData.push({'Name': value['Name'], 'Tenant Name': value['Tenant Name'], 'date': parseInt((new Date(value[dateMode]).getTime()).toFixed(0)), 'value': value['sales']})
        })
        console.log(dateMode,salesData.length)

        //Get percentage of change from previous sales
        // Get the last two objects in the array
const totalSalesObj = salesData[salesData.length - 1];
const totalPreviousSalesObj = salesData[salesData.length - 2];

// Calculate the percentage change
const percentageChange = totalPreviousSalesObj.value == 0 ? totalSalesObj.value*100 : ((totalSalesObj.value - totalPreviousSalesObj.value) / totalPreviousSalesObj.value) * 100;

        console.log(totalSalesObj.value, parseInt(percentageChange) )
        // send records as a response
        res.status(200).send({salesData, totalSales: parseFloat(totalSalesObj.value).toFixed(2), percentageChange: parseInt(percentageChange)});
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



