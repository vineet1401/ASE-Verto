
const Employee = require('../models/employee.js');
const { validateEmployee } = require('../validators/employeeValidator.js');



const getAll = async (req, res) => {
  try {
    let { page, pageSize } = req.query;
    if (!page) page = 1;
    if (!pageSize) pageSize = 10;
    const { employees, total } = await Employee.getAllEmployees(page, pageSize);
    res.json({ employees, total });
  } catch {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

const getOne = async (req, res) => {
  try {
    const emp = await Employee.getEmployeeById(req.params.id);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });
    res.json(emp);
  } catch {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

const create = async (req, res) => {
  const error = validateEmployee(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const employee = await Employee.createEmployee(req.body);
    res.status(201).location(`/api/employees/${employee.id}`).json(employee);
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

const update = async (req, res) => {
  const error = validateEmployee(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const exists = await Employee.getEmployeeById(req.params.id);
    if (!exists) return res.status(404).json({ error: 'Employee not found' });
    const employee = await Employee.updateEmployee(req.params.id, req.body);
    res.json(employee);
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

const remove = async (req, res) => {
  try {
    const exists = await Employee.getEmployeeById(req.params.id);
    if (!exists) return res.status(404).json({ error: 'Employee not found' });
    await Employee.deleteEmployee(req.params.id);
    res.status(204).end();
  } catch {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

module.exports = { getAll, getOne, create, update, remove };
