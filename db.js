const {Client} = require('pg')

const client = new Client({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})


const connectDB = async () =>{
    client.connect()
    .then(() => {
        console.log('A conexão funcionou')
}).catch((err) => {
    console.error('Erro ao conectar na DB')
})
}

const setup = async (req, res) =>{
    try{
        const data = await client.query
        ('create table usuarios (id serial primary key, nome varchar(100), email varchar(50), senha varchar(20))')
        res.status(200).json({msg: 'A tabela foi criada'})
    }catch (err) {
        console.log('Erro ao criar a tabela')
        res.status(500)
    }
}







module.exports = {connectDB, setup, client}