const express = require('express');
const router = express.Router();

const Task = require('../models/task');

// getting all the tasks
router.get('/tasks',(req, res, next) => {
    Task.find((err, tasks) => {
        if(err) {
            res.send('Error recieved: '+err);
        }else{
            res.json(tasks);
        }  
    })
});

// adding a new task
router.post('/task', (req, res, next) => {
    let newTask = new Task({
        name: req.body.name,
        taggedList: req.body.taggedList,
        createdBy: req.body.createdBy,
        status: req.body.status
    });

    newTask.save((err, task) => {
        if(err) {
            res.json({message: 'Failed to add task '+err});
        } else {
            res.json({message: 'Added sucessfully'});
        }
    })
});

// deleting a task
router.delete('/tasks/:id', (req, res, next) => {
    Task.remove({_id: req.params.id}, (err, result) => {
        if(err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;