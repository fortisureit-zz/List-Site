const express = require('express')
const cors = require('cors')
const mysql = require('mysql')



const app = express()

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM Restrnts'

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'restaurant-list-db-do-user-7144326-0.a.db.ondigitalocean.com',
    user            : 'doadmin',
    password        : 'xwuk8weoo3swlnbd',
    database        : 'defaultdb'

})
    

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