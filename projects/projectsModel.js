const db = require('../data/db-config');

const find = () => {
  return db('Projects');
}

const findById = (id) => {
  return db('Projects')
    .where({ id })
    .first()
}

const findResourcesByProjectId = id => {
  return db('*').from('Project_Resources as P')
    .where({ project_id: id })
    .join('Resources as R', 'P.resource_id', 'R.id')
}

const findTasksByProjectId = id => {
  return db('tasks').where({ project_id: id });
}

const insert = project => {
  return db("Projects")
    .insert(project, "id")
    .then(([id]) => find().where({ id }));
}

const update = (id, changes) => {
  return db("Projects")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));
}

const remove = id => {
  return db("Projects")
    .where("id", id)
    .del();
}

module.exports = {
  find,
  findById,
  findResourcesByProjectId,
  findTasksByProjectId,
  insert,
  update,
  remove
}