const express = require('express')
require("dotenv").config()
const connectDB = require('./db')

const app = express()

connectDB()

app.get('/test-api', function(req, res){
    res.send("Nossa API está funcionando")
})
app.listen(8000)