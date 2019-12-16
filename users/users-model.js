const db = require('../data/db-config');

module.exports = {
  addUser,
  findUserBy,
  allUsers,
};

function findUserBy(filter) {
  return db('users')
    .select('id', 'username', 'password')
    .where(filter)
    .first();
}

function addUser(userData) {
  return db('users')
    .insert(userData, 'id')
    .then(ids => {
      const [id] = ids;

      return findUserBy({id});
    });
}

function allUsers() {
  return db('users');
}
