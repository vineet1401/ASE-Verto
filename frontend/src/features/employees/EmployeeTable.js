import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Position</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.length === 0 ? (
        <tr>
          <td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No employees found.</td>
        </tr>
      ) : employees.map(emp => (
        <tr key={emp.id}>
          <td>{emp.name}</td>
          <td>{emp.email}</td>
          <td>{emp.position}</td>
          <td style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button onClick={() => onEdit(emp)}>Edit</button>
            <button style={{ background: '#e53e3e' }} onClick={() => onDelete(emp.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EmployeeTable;
