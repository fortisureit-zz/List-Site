const express = require('express')

const cors = require('cors')
const path = require('path')
const fs = require('fs')
const filename = './secrets/ca-certificate.crt'
require('dotenv').config()
const mysql = require('mysql')

const app = express()

// var whitelist = ['http://localhost:5000/', 'http://localhost:5000/server', 'http://localhost:3000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// Then pass them to cors:
app.use(cors())

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
// app.use(express.static(path.join(__dirname, 'build')))

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))


app.use(express.static(path.join(__dirname, 'client/build')))


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


app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })


app.listen(5000, () => {
    console.log('listening on port:5000') 
})