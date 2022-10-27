const { Router } = require("express");
const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController.js");

const router = Router();

router.route("/").get(getEmployees).post(addEmployee);

router
  .route("/:id")
  .get(getEmployeeById)
  .delete(deleteEmployee)
  .put(updateEmployee);

module.exports = router;
