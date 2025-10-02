

const { getDb } = require('./db.js');




const getAllEmployees = async (pg, sz) => {
  const db = getDb();
  const page = Math.max(1, parseInt(pg));
  const pageSize = Math.max(1, parseInt(sz));
  const offset = (page - 1) * pageSize;
  const employees = await db.all('SELECT * FROM employees LIMIT ? OFFSET ?', [pageSize, offset]);
  const countRow = await db.get('SELECT COUNT(*) as count FROM employees');
  return { employees, total: countRow.count };
};

const getEmployeeById = async (id) => {
  const db = getDb();
  return db.get('SELECT * FROM employees WHERE id = ?', id); 
};

const createEmployee = async ({ name, email, position }) => {
  const db = getDb();

  const result = await db.run(
    'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)',
    [name, email, position]
  );
  return getEmployeeById(result.lastID);
};

const updateEmployee = async (id, { name, email, position }) => {
  const db = getDb();
  await db.run(
    'UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?',
    [name, email, position, id]
  );
  return getEmployeeById(id);
};

const deleteEmployee = async (id) => {
  const db = getDb();
  return db.run('DELETE FROM employees WHERE id = ?', id);
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
