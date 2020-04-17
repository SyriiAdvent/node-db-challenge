const express = require('express');
const Projects = require('./projectsModel');
const router = express.Router();

router.get('/', (req, res) => { // GET all Projects
  Projects.find()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get recipe' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Projects.findById(id)
  .then(project => {
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get project' });
  });
});

router.post('/', validateProject, (req, res) => { // Creates Projects with validation Middleware
  res.status(201).json(req.project)
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Projects.findById(id)
  .then(project => {
    if (project) {
      Projects.update(id, changes)
      .then(updatedProject => {
        res.json(updatedProject);
      });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update project' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete project' });
  });
});


module.exports = router;

function validateProject(req, res, next) {
  const item = req.body
  if(item.name && item.description) {
    Projects.insert(req.body)
      .then(project => {
        req.project = project
        console.log(project)
        next();
      })
      .catch(err => res.status(500).json({ errorMessage: `Error creating project on server end.`, err }))
  } else {
    res.status(404).json({ errorMessage: `request must contain both name and a description field.` })
  }
}