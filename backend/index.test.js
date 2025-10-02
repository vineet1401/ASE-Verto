const request = require('supertest');
const express = require('express');
const { getDb } = require('./models/db.js');

// Setup DB mock before requiring routes
jest.spyOn(require('./models/db.js'), 'getDb').mockImplementation(() => db);
const employeeRoutes = require('./routes/employeeRoutes.js');

let app, db;
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

beforeAll(async () => {
  app = express();
  app.use(express.json());

  db = await sqlite.open({ filename: ':memory:', driver: sqlite3.Database });
  await db.run(`CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    position TEXT NOT NULL
  )`);

  app.use('/api/employees', employeeRoutes);
});

afterAll(async () => {
  await db.close();
});

describe('Employee API', () => {
  let empId;
  it('should create an employee', async () => {
    const res = await request(app)
      .post('/api/employees')
      .send({ name: 'Employee 101', email: 'employee101@example.com', position: 'Developer' });
    console.log('Create:', res.statusCode, res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Employee 101');
    empId = res.body.id;
  });
  it('should get all employees', async () => {
    const res = await request(app).get('/api/employees');
    console.log('Get All:', res.statusCode, res.body);
  expect(res.statusCode).toBe(200);
  expect(res.body.employees.length).toBeGreaterThan(0);
  });
  it('should update an employee', async () => {
    const res = await request(app)
      .put(`/api/employees/${empId}`)
      .send({ name: 'Employee 101', email: 'employee101@example.com', position: 'Developer' });
    console.log('Update:', res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Employee 101');
  });
  it('should delete an employee', async () => {
    const res = await request(app).delete(`/api/employees/${empId}`);
    console.log('Delete:', res.statusCode, res.body);
    expect(res.statusCode).toBe(204);
  });
});
