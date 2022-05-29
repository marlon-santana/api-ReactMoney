const express = require('express');
const authMiddleware = require('../middlewares/auth.js');
const Project = require('../models/project');
const Task = require('../models/task');



const router = express.Router();

router.use(authMiddleware);


router.get('/', async (req, res) => {
   try {
       const projects = await Project.find();

       return res.send({ projects });

   }catch(err) {
       return res.status(400).send({ erro: 'Erro loading project'});
   }
});

router.get('/:projectId', async (req, res) => {
    res.send({user: req.userId});
});

router.post('/', async (req, res) => {
    try {
        const project = await Project.create(req.body);

        return res.send({ project });

    }catch(err) {
        return res.status(400).send({ erro: "Erro creating projects" });
    }
});
router.put('/:projectId', async (req, res) => {
    res.send({ user: req.userId});
});
router.delete('/:projectId', async (req, res) => {
    res.send({ user: req.userId});
});


module.exports = app => app.use('/projects', router);