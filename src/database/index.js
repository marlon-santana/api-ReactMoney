const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://marlon:marlonsantana4@cluster0.co3lc.mongodb.net/?retryWrites=true&w=majority',
     //{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log("banco de dados conectado");
    }
  );
  
  
  module.exports = mongoose;