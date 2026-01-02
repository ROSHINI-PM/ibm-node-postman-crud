const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let employees = [];
let id = 1;

app.get("/test", (req, res) => {
  res.send("Node.js Express App Running");
});

app.post("/employees", (req, res) => {
  const { name, role } = req.body;
  const employee = { id: id++, name, role };
  employees.push(employee);
  res.status(201).json(employee);
});

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.put("/employees/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  const { name, role } = req.body;
  const employee = employees.find(e => e.id === empId);
  if (!employee) return res.status(404).send("Employee not found");
  employee.name = name;
  employee.role = role;
  res.json(employee);
});

app.delete("/employees/:id", (req, res) => {
  const empId = parseInt(req.params.id);
  employees = employees.filter(e => e.id !== empId);
  res.send("Employee deleted");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
