const db = require('../../data/db-config');

const find = (route) => {
  return db('Resources');
}

const findById = (id) => {
  return db('Resources')
    .where({ id })
    .first()
}

const insert = resources => {
  return db("Resources")
    .insert(resources, "id")
    .then(([id]) => find().where({ id }));
}

const update = (id, changes) => {
  return db("Resources")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));
}

const remove = id => {
  return db("Resources")
    .where("id", id)
    .del();
}

module.exports = {
  find,
  insert,
  update,
  remove
}