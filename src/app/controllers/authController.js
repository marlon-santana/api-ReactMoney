const express = require('express');
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const authConfig = require('../../config/auth');
const crypto = require('crypto');
const mailer = require('../../modules/mailer.js');


const User = require('../models/user');

const router = express.Router();

//  function generateToken(params = {}) {
//     return jwt.sign(params, authConfig.secret, {
//         expiresIn: 86400 // 24horas.
//     });
//  }
//************************************************************************************************* */
//  router.post("/forgot_password", async (req, res) => {
//      //rota precisa ser ajustada
//     const { email } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
  
//       if (!user) return res.status(400).send({ erro: "Usuario nao encontrado" });
  
//       //const token = crypto.randomBytes(20).toString("hex");//hex
  
//       const now = new Date();
  
//       now.setHours(now.getHours() + 1);
  
//       await User.findByIdAndUpdate(
//         user.id,
//         {
//           $set: {
//             passwordResetToken: token,
//             passwordResetExpires: now
//           }
//         }
//       )

//       mailer.sendMail(
//         {
//           to: email,
//           from: "marlon@gmail.com",
//           template: "auth/forgot_password",
//           context: { token }
//         },
//         err => {
//           console.log(err);
  
//           if (err)
//             return res.status(400).send({
//               error: "Nao foi possivel enviar email de esqueci a senha"
//             });

//           return res.send('nao chegou aqui');
//       } )

//      }catch (err) {
//         res.status(400).send({ erro: 'Erro on forgot password, try again'});
//      }
//  })
//*********************************************************************************************************** */

//  router.post('/reset_password', async (req, res) => {
//     const { email , token, password } = req.body;

//     try {
//         const user = await User.findOne({ email })
//         .select('+passwordResetToken');

//         if(!user)
//        return res.status(400).send({ erro: ' User not found'});

//         if(token !== user.passwordResetToken)
//         return res.status(400).send({ erro: 'Token invalid'});

//         const now = new Date();

//         if( now > user.passwordResetExpires)
//         return res.status(400).send({ erro: 'Token expired, generate a new one '});

//         user.password = password;

//         await user.save();

//         res.send();

//     }catch (err) {
//       return  res.status(400).send({ erro: 'Cannot reset password, try again' });
//     }
//  });


router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email }))
        return res.status(400).send({ error: "User already exists"});

        const user = await User.create(req.body);

        user.password = undefined;

        // return res.send({user,
        //     token: generateToken({ id: user.id }),
        // });

    }catch (err) {
        return res.status(400).send({
            error: 'Registration failed'
        });
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user =  await User.findOne({ email}).select('+password');

    if(!user) 
    return res.status(400).send({ error: 'User not found '});

    if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password'});

    user.password = undefined;


    // res.send({ user,
    //      token: generateToken({ id: user.id}),

    //      });
});
module.exports = app => app.use('/auth', router);