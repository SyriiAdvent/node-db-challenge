const express = require('express');
const Tasks = require('./tasksModel');
const router = express.Router();

router.get('/', (req, res) => { // GET all tasks
  Tasks.find()
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get task' });
  });
});

router.get('/detailed', (req,res) => {
  Tasks.findTaskDetailed()
    .then(tasks => {
      res.status(200).json(tasks)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get task' });
    });
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Tasks.findById(id)
  .then(task => {
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Could not find task with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get task' });
  });
});

router.post('/', validateTask, (req, res) => {
  res.status(201).json(req.task)
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Tasks.findById(id)
  .then(task => {
    if (task) {
      Tasks.update(id, changes)
      .then(updatedTask => {
        res.json(updatedTask);
      });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update task' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Tasks.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete task' });
  });
});


module.exports = router;

function validateTask(req, res, next) {
  const item = req.body
  if(item.name && !item.task_status && item.project_id) {
    console.log(item)
    Tasks.insert(req.body)
      .then(task => {
        req.task = task
        console.log(task)
        next();
      })
      .catch(err => res.status(500).json({ errorMessage: `Error creating task on server end.`, err }))
  } else {
    res.status(404).json({ errorMessage: `request must contain name, projectID and status field.` })
  }
}