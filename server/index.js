import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import tedious from 'tedious'
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


/* SQL SERVER SETUP */

    var config = {
        "server": process.env.SQL_SERVER_URL,
        "authentication": {
          "type": "default",
          "options": {
            "userName": process.env.SQL_SERVER_USERNAME,
            "password": process.env.SQL_SERVER_PASSWORD
          }
        },
        "options": {
          "port": process.env.PORT || 9000,
          "database": process.env.SQL_SERVER_DATABASE,
          "trustServerCertificate": true,
          "encrypt": true,
        }
      }


    const Request = tedious.Request;
        const Connection = tedious.Connection;
        const connection = new Connection(config);
        connection.on('connect', (err) => {
          if (err) {
            console.log('Connection Failed');
            throw err;
          }
          executeStatement();
        });
        connection.connect();
        function executeStatement() {
          const request = new Request("select 42, 'hello world'", (err, rowCount) => {
            if (err) {
              throw err;
            }
            console.log('DONE!');
            connection.close();
          });
          // Emits a 'DoneInProc' event when completed.
          request.on('row', (columns) => {
            columns.forEach((column) => {
              if (column.value === null) {
                console.log('NULL');
              } else {
                console.log(column.value);
              }
            });
          });
          // In SQL Server 2000 you may need: connection.execSqlBatch(request);
          connection.execSql(request);
        }