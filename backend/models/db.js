

const sqlite3  =  require('sqlite3'); 
const { open } = require('sqlite'); 


let database;

const initDb = async () => {
  database = await open({
    filename: './employees.db', 
    driver: sqlite3.Database
  });
  await database.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    position TEXT NOT NULL
  )`);
  return database;
};



const getDb = () => {
  if (!database) throw new Error('DB not initialized');
  return database;
};


module.exports = { initDb, getDb };
