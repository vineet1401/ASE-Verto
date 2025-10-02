import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = 'http://localhost:4000/api/employees';

export const fetchEmployees = createAsyncThunk('employees/fetch', async ({ page = 1, pageSize = 5 } = {}) => {
  const res = await axios.get(API_URL + `?page=${page}&pageSize=${pageSize}`);
  return res.data;
});

export const addEmployee = createAsyncThunk('employees/add', async (employee) => {
  const res = await axios.post(API_URL, employee);
  return res.data;
});

export const updateEmployee = createAsyncThunk('employees/update', async ({ id, ...employee }) => {
  const res = await axios.put(`${API_URL}/${id}`, employee);
  return res.data;
});

export const deleteEmployee = createAsyncThunk('employees/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});


const employeesSlice = createSlice({
  name: 'employees',
  initialState: { list: [], total: 0, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.list = action.payload.employees;
        state.total = action.payload.total;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.error = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        const idx = state.list.findIndex(e => e.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.error = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default employeesSlice.reducer;
