const express = require('express')

const cors = require('cors')
const https = require('https')
const fs = require('fs')
const filename = './secrets/ca-certificate.crt'

const mysql = require('mysql')



const app = express()

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM ConnTest'

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'restaurant-list-db-do-user-7144326-0.a.db.ondigitalocean.com',
    user            : 'doadmin',
    password        : 'xwuk8weoo3swlnbd',
    database        : 'defaultdb',
    port            : 25060,
    ssl             : {
        ca: fs.readFileSync(filename, function(err, data) {
            if (err) throw err;
            resp.write(data);
            resp.end();
        })
    }

})
    // pool.connect(err => {
    //     if(err) {
    //         return err
    //     }
    // })

app.use(cors())

app.get('/', (req, res) => {
    res.send("Index")

})

app.get('/restaurants', (req,res) => {

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