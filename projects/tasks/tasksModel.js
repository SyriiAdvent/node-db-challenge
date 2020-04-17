const db = require('../../data/db-config');

const find = (route) => {
  return db('Projects');
}

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
  update,
  remove
}