# Employee Data Management Backend

## Setup

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
   The API will run on http://localhost:4000

## API Endpoints
- `GET /api/employees` - List all employees
- `POST /api/employees` - Add new employee (name, email, position)
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## Run Tests
```sh
npm test
```
