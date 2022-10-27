const pool = require("../db.js");

const getEmployees = async (req, res) => {
  try {
    const allEmployees = await pool.query(
      "SELECT * FROM employees ORDER BY id ASC"
    );

    res.status(200).json({
      status: "success",
      data: allEmployees.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to retrieve employees.",
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [
      id,
    ]);

    res.status(200).json({
      status: "success",
      data: employee.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to retrieve employee.",
    });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { name, code, profession, color, city, branch, assigned } = req.body;
    console.log(req.body);
    const employee = await pool.query(
      "INSERT INTO employees (name, code, profession, color, city, branch, assigned) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, code, profession, color, city, branch, assigned]
    );

    res.status(200).json({
      status: "success",
      data: employee.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to add employee.",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM employees WHERE id = $1", [id]);

    res.status(200).json({
      status: "success",
      message: "Employee has been deleted.",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to delete employee.",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, code, profession, color, city, branch, assigned } = req.body;

    const employee = await pool.query(
      "UPDATE employees SET name = $1, code = $2, profession = $3, color = $4, city = $5, branch = $6, assigned = $7 WHERE id = $8 RETURNING *",
      [name, code, profession, color, city, branch, assigned, id]
    );

    res.status(200).json({
      status: "success",
      data: employee.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "Failed to update employee.",
    });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  deleteEmployee,
  updateEmployee,
};
