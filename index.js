const express = require('express')
const {Client} = require('pg')
require("dotenv").config()

const client = new Client({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})


const app = express()

const connectDB = async () =>{
    client.connect()
    .then(() => {
        console.log('A conexão funcionou')
}).catch((err) => {
    console.error('Erro ao conectar na DB')
})
}
connectDB()

app.get('/test-api', function(req, res){
    res.send("Nossa API está funcionando")
})
app.listen(8000)