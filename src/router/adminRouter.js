const { login } = require("../controller/admin.controller");
const adminController = require("../controller/admin.controller");
const { isAuthenticated } = require("../middleware/checkauth");

const router = require("express").Router();
router.post("/login", adminController.login);
router.post("/create", adminController.create);
router.post("/getProfile", adminController.getAdmin);
router.patch("/updateProfile", isAuthenticated, adminController.updateAdmin);

const adminRouter = router;
module.exports = adminRouter;
