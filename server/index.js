const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM users'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sys'
})
    connection.connect(err => {
        if(err) {
            return err
        }
    })

app.use(cors())

app.get('/', (req, res) => {
    res.send("Index")

})

app.get('/restaurants', (req,res) => {

    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    })
})

app.listen(5000, () => {
    console.log('listening on port:5000')
})