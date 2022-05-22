const express = require('express');

const app = express();

app.use(express.json());

 let author = {
     "nome":"marlon de oliveira",
     "age":"36",
     "city":"nova iguaçu",
 }

 app.route('/').get((req, res) =>  res.send(author));

//  app.route('/').post((req, res) => res.send(req.body))//recebe o content da requisição e devolve essa informação na resposta.
 
//  app.route('/').put((req, res) => {
//      author = req.body;
//      res.send(author)
//     })

    /********Requisições com  parametros************/
//    app.route('/').get((req, res) => res.send(req.query.name));
//    app.route('/').post((req, res) => req.send(req.body));
    app.route('/:parametro').get((req, res) => res.send(req.params.parametro))

app.use(express.json());

app.route('/').post((req, res) => {
    const {author } = req.body
    res.send(`o author é ${author}`) // api recebe nome e idade no body e repassa  de novo como resposta a frase
});                                                     //com as variaves.

app.listen(3000);

//mongodb://marlon:marlonsantana4@datalake0-cpwpv.a.query.mongodb.net/?ssl=true&authSource=admin