import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSave, initial, onCancel }) => {
  const [form, setForm] = useState(initial || { name: '', email: '', position: '' });
  const [err, setErr] = useState('');
  useEffect(() => { if (initial) setForm(initial); }, [initial]);
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.position.trim()) {
      setErr('All fields required');
      return;
    }
    setErr('');
    onSave(form);
    if (!initial) setForm({ name: '', email: '', position: '' });
  };
  return (
    <form className="emp-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch', minWidth: 260 }}>
      <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input required placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input required placeholder="Position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
        <button type="submit">{initial ? 'Update' : 'Add'}</button>
        {onCancel && <button type="button" onClick={onCancel} style={{ background: '#e53e3e' }}>Cancel</button>}
      </div>
      {err && <span style={{ color: 'red', marginLeft: 8 }}>{err}</span>}
    </form>
  );
};

export default EmployeeForm;
