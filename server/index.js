const express = require('express')
const cors = require('cors')
const mysql = require('mysql')



const app = express()

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM Restrnts'

const connection = mysql.createConnection('mysql://doadmin:xwuk8weoo3swlnbd@private-restaurant-list-db-do-user-7144326-0.a.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUIRED')

app.use(cors())

app.get('/', (req, res) => {
    res.send("Index")

})

app.get('/restaurants', (req,res) => {

    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
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