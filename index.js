const express = require('express');

const app = express();

app.listen(3000);

app.use(express.json());

let author = 'marlon de oliveira';

app.route('/').get((req, res) =>  res.send(author));

 app.route('/').post((req, res) => res.send(req.body))//recebe o content da requisição e devolve essa informação na resposta.
 
 app.route('/').put((req, res) => {
     author = req.body;
     res.send(author)
    })

    /********Requisições com  parametros************/
   app.route('/').get((req, res) => res.send(req.query.name));
   app.route('/').post((req, res) => req.send(req.body));
   app.route('/:parametro').get((req, res) => res.send(req.params.parametro))