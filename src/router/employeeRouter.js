const {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employee.controller");
const { isAuthenticated } = require("../middleware/checkauth");

const router = require("express").Router();
router.post("/createEmployee", isAuthenticated, createEmployee);
router.post("/getEmployee", isAuthenticated, getEmployee);
router.patch("/updateEmployee", isAuthenticated, updateEmployee);
router.delete("/deleteEmployee", isAuthenticated, deleteEmployee);
const employeeRouter = router;
module.exports = employeeRouter;
