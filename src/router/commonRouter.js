const adminController = require("../controller/admin.controller");

const router = require("express").Router();
router.post("/admin/login", adminController.login);
router.post("/admin", adminController.create);

const commonRouter = router;
module.exports = commonRouter;
