const {fetch, fetchOne} = require("../utils/pg");

const createQuery =
  "insert into todos(title, description) values ($1, $2) returning*";

const findQuery = "select * from todos order by created_at";

module.exports = {
  create: async (title, description) =>
    await fetchOne(createQuery, title, description),
  find: async () => await fetch(findQuery),
};
