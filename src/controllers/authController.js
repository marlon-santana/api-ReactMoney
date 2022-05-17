const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');


const router = express.Router();

function generateToken(params = {}) {
    const token = jwt.sign({ id: user.id }, authConfig.secret, { //cria um toke usando o id do usuário e um hash
        expiresIn: 86400, //1 dia expiração
    })
}

router.post('/register', async (req, res) => { //rota post de registro
    const { email } = req.body;                 // destruturando  do corpo da requisição o email

    try {
        if (await User.findOne({ email })) 
        return res.status(400).send( {error: 'User already exists'}); // se o email já existir no BD retorna mensagem usuario já existe

        const user = await User.create(req.body);  // cria usuario com dados  do orpo da requisição
        
        user.password = undefined;       // apaga o password criado para nao ficar visivel

        return res.send({ user,
            token: generateToken({ id: user.id }),// devolve usuário como resposta e o token gerado
            });

    }catch (err) {
        return res.status(400).send({error: 'Registration failed'});  //retorna erro de falha de criação de novo usuário
    }
});

router.post('/authenticate', async (req, res) => { // rota de authenticação
    const { email, password } = req.body;      // destruct do email e senha  do corpo da requisição

    const user = await User.findOne({ email }).select('+password') // usuario com password

    if(!user) 
        return res.status(400).send({ error: 'User not found '}); // se não existir usuário com esse email e password retiorna erro

    if(!await bcrypt.compare(password, user.password))// comparar password com o user password criptografado
    return res.status(400).send( {error: 'Invalid password '});// retorna erro

    user.password = undefined  // limpa campo password

   

    res.send({ user,
         token: generateToken({ id: user.id }),// devolve usuário como resposta e o token gerado
         });
    
})

module.exports = app => app.use('/auth', router);  