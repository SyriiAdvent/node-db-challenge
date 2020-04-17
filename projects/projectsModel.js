const db = require('../data/db-config');

const find = () => {
  return db('Projects');
}

const findById = (id) => {
  return db('Projects')
    .where({ id })
    .first()
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
  insert,
  update,
  remove
}