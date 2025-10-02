
const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes.js');
const { initDb } = require('./models/db.js');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/employees', employeeRoutes);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
