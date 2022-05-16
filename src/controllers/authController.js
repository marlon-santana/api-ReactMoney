const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => { //rota post de registro
    const { email } = req.body;                 // destruturando  do corpo da requisição o email

    try {
        if (await User.findOne({ email })) 
        return res.status(400).send( {error: 'User already exists'}); // se o email já existir no BD retorna mensagem usuario já existe

        const user = await User.create(req.body);  // cria usuario com dados  do orpo da requisição
        
        user.password = undefined;       // apaga o password criado para nao ficar visivel

        return res.send({ user });    // retorna usuario criado.

    }catch (err) {
        return res.status(400).send({error: 'Registration failed'});  //retorna erro de falha de criação de novo usuário
    }
});

module.exports = app => app.use('/auth', router);  