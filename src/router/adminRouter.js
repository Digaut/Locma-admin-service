const adminController = require("../controller/admin.controller");

const router = require("express").Router();
router.post("/login", adminController.login);
router.post("/create", adminController.create);
router.post("/getAdmin", adminController.getAdmin);
router.patch("/updateAdmin", adminController.updateAdmin);

const adminRouter = router;
module.exports = adminRouter;
