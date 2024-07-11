const {client} = require('./db')
const bcryptjs = require('bcrypt')
const jwt = require("jsonwebtoken")

const listUsers = async(req, res) =>{
    res.send('Lista de usuários')
}


const createUser = async(req, res) =>{
   try{
        const {nome, email, senha} = req.body
        const senhaCriptografada = await bcryptjs.hashSync(senha, 10)
        const sql = `insert into usuarios (nome, email, senha) values ($1, $2, $3) Returning*`
        const dados = await client.query(sql, [nome, email, senhaCriptografada])
        res.status(201).json({msg:'O usuário foi criado com sucesso'})
   }catch(err){
    console.log(err)
    res.status(500).json({msg:'Erro ao criar o usuário'})
   }
}

const updateUser = async(req, res) =>{
    try{
        console.log(1)
        const id = req.params.id;
        const {nome, email} = req.body;
        const sql = `update usuarios set nome = $1, email = $2 where id = $3 Returning*`
        const dados = await client.query(sql, [ nome, email, id])
        console.log(dados)
        res.status(201).json({msg:'O usuário foi atualizado com sucesso'})
   }catch(err){
    console.log(err)
    res.status(500).json({msg:'Erro ao atualizar o usuário'})
   }
}

const deleteUser = async(req, res) =>{
    try{
        const id = req.params.id
        const sql = `Delete from usuarios where id = $1`
        const dados = await client.query(sql, [id])
         res.status(200).json({msg:'O usuário foi deletado'})
}catch(err){
        console.log(err)
        res.status(500).json({msg:'Erro ao atualizar o usuário'})
}
}


const login = async (req, res) => {
    try{
        const {email, senha} = req.body
        const sql = `SELECT*FROM usuarios where email = $1`
        const usuario = await client.query(sql, [email])
        const validSenha = bcryptjs.compareSync(senha, usuario.rows[0].senha)
        console.log(validSenha)
        //fazer if else se a senha for valida
        const token = jwt.sign(
            {
                _id: usuario.rows[0].id,
                email: usuario.rows[0].email,
                nome: usuario.rows[0].nome,
            },
            process.env.jwt_secret_key,
            {expiresIn: 1000*60*60*24*3}
        )
        res.status(200).cookie("Scarlett", token, {}) .json({msg: "Você efetuou o login"})
        
    }catch(err){
        console.log(err)
        res.send(500)
    }
}




const getUser = async(req, res) =>{
    console.log('teste')
}
 
module.exports = {listUsers,createUser, updateUser, deleteUser, getUser, login};