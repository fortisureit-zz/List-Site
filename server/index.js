const express = require('express')

const cors = require('cors')
const https = require('https')
const fs = require('fs')
const filename = './secrets/ca-certificate.crt'
require('dotenv').config()

const mysql = require('mysql')



const app = express()

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM Restrnts'

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.HOST,
    user            : process.env.USER,
    password        : process.env.PASS,
    database        : 'Restrnt_Listing',
    port            : 25060,
    ssl             : {
        ca: fs.readFileSync(filename, function(err, data) {
            if (err) throw err;
            resp.write(data);
            resp.end();
        })
    }

})
// const whitelist = ['http://localhost:3000', 'http://localhost:5000/server', 'http://localhost:5000']
// const corsOptionsDelegate = function (req, callback) {
//   const corsOptions = {}
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

app.use(cors())

// app.get('/', (req, res) => {
//     res.send("Index")

//})

app.get('/server', (req,res) => {

    pool.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send({
                data: results
            })
        }
    })
})

app.listen(5000, () => {
    console.log('listening on port:5000') 
})