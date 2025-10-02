import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from './slices/employeesSlice';
import './App.css';
import './Modal.css';
import './Toast.css';

import Modal from './components/Modal';
import Toast from './components/Toast';
import EmployeeForm from './features/employees/EmployeeForm';
import EmployeeTable from './features/employees/EmployeeTable';
import Pagination from './components/Pagination';




const App = () => {
  const dispatch = useDispatch();
  const { list, total, status, error } = useSelector(s => s.employees);
  const [toast, setToast] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState('');

  useEffect(() => { dispatch(fetchEmployees({ page, pageSize })); }, [dispatch, page, pageSize]);

  useEffect(() => {
    if (error) setToast(error);
  }, [error]);

  const totalPages = Math.ceil((total || 0) / pageSize);
  const pagedList = list.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase()) ||
    emp.position.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setModalEdit(null);
    setModalOpen(true);
  };
  const handleEdit = (emp) => {
    setModalEdit(emp);
    setModalOpen(true);
  };
  const handleModalSave = (data) => {
    if (modalEdit) {
      dispatch(updateEmployee({ id: modalEdit.id, ...data }));
    } else {
      dispatch(addEmployee(data));
    }
    setModalOpen(false);
  };

  return (
    <div className="app-container">
      <h1>EMPLOYEE MANAGEMENT</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <button style={{ width: 200 }} onClick={handleAdd}>Add Employee</button>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginLeft: 'auto', width: 220, padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 16 }}
        />
      </div>
      {status === 'loading' && <p>Loading...</p>}
      <Toast message={toast} onClose={() => setToast('')} />
      <div className="table-scroll">
        <EmployeeTable
          employees={pagedList}
          onEdit={handleEdit}
          onDelete={id => dispatch(deleteEmployee(id))}
        />
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={p => setPage(Math.max(1, Math.min(totalPages, p)))}
        pageSize={pageSize}
        onPageSizeChange={sz => { setPageSize(sz); setPage(1); }}
      />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <EmployeeForm
          initial={modalEdit}
          onSave={handleModalSave}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default App;
