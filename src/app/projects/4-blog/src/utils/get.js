async function get(db) {
  return await db.read();
}

module.exports = {get};
