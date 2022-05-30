const express = require('express');
const authMiddleware = require('../middlewares/auth.js');
const Project = require('../models/project');
const Task = require('../models/task');



const router = express.Router();

router.use(authMiddleware);


router.get('/', async (req, res) => {
   try {
       const projects = await Project.find().populate(['user','tasks']);

       return res.send({ projects });

   }catch(err) {
       return res.status(400).send({ erro: 'Erro loading project'});
   }
});

router.get('/:projectId', async (req, res) => {
    try {
        const projects = await Project.findById(req.params.projectId).populate(['user','tasks']);
 
        return res.send({ projects });
 
    }catch(err) {
        return res.status(400).send({ erro: 'Erro loading project'});
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, tasks } = req.body;
        const project = await Project.create({title, description, user: req.userId });

       await Promise.all( tasks.map( async tasks => {
            const projectTask = new Task({...tasks, project: project._id});

            projectTask.save();

            project.tasks.push(projectTask);
}))

            await project.save();

        return res.send({ project });

    }catch(err) {
        return res.status(400).send({ erro: "Erro creating projects" });
    }
});
router.put('/:projectId', async (req, res) => {
    try {
        const { title, description, tasks } = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title,
             description,
        }, {new: true });

        project.tasks = [];

        await Task.remove({ project: project._id});


       await Promise.all( tasks.map( async tasks => {
            const projectTask = new Task({...tasks, project: project._id});

            projectTask.save();

            project.tasks.push(projectTask);
}))

            await project.save();

        return res.send({ project });

    }catch(err) {
        return res.status(400).send({ erro: "Erro update projects" });
    }
});
router.delete('/:projectId', async (req, res) => {
    try {
       await Project.findByIdAndRemove(req.params.projectId);
 
        return res.send();
 
    }catch(err) {
        return res.status(400).send({ erro: 'Erro deleting project'});
    }
});


module.exports = app => app.use('//projects', router);