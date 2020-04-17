const express = require('express');
const Resources = require('./resourcesModel');
const router = express.Router();

router.get('/', (req, res) => { // GET all Resources
  Resources.find()
  .then(resources => {
    res.json(resources);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get recipe' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Resource.findById(id)
  .then(resource => {
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Could not find resource with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get resource' });
  });
});

router.post('/', validateResource, (req, res) => { // POST Create Resource
  res.status(201).json(req.Resource)
})

router.delete('/:id', (req, res) => { // DELETE Resource
  const { id } = req.params;

  Resource.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find resource with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete resource' });
  });
});


module.exports = router;

function validateResource(req, res, next) {
  const item = req.body
  if(item.name) {
    Resources.insert(req.body)
      .then(Resource => {
        req.resource = resource
        console.log(resource)
        next();
      })
      .catch(err => res.status(500).json({ errorMessage: `Error creating Resource on server end.`, err }))
  } else {
    res.status(404).json({ errorMessage: `request must contain both name and a description field.` })
  }
}