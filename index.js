const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000;
const helmet = require('helmet');
const projectsRouter = require('./projects/projectsRouter');
const tasksRouter = require('./projects/tasks/tasksRouter');
const resourcesRouter = require('./projects/resources/resourcesRouter');

server.use(helmet())
server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/tasks', tasksRouter)
server.use('/api/resources', resourcesRouter)

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});