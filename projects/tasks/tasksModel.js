const db = require('../../data/db-config');

const find = (route) => {
  return db('Projects');
}

const findTaskDetailed = id => {
  return db('T.id', 'T.name', 'T.task_status', 'P.name as ProjectName',
  'P.description')
    .from('Tasks as T')
    .join('projects as P', 'P.id', 'T.project_id')
}

findTaskDetailed()

const findById = (id) => {
  return db('Tasks')
    .where({ id })
    .first()
}

const insert = task => {
  return db("Tasks")
    .insert(task, "id")
    .then(([id]) => find().where({ id }));
}

const update = (id, changes) => {
  return db("Tasks")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));
}

const remove = id => {
  return db("Tasks")
    .where("id", id)
    .del();
}

module.exports = {
  find,
  insert,
  findTaskDetailed,
  update,
  remove
}