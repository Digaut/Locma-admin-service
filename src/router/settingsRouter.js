const {
  createSettings,
  getSettings,
  updateSettings,
  deleteSettings,
} = require("../controller/settings.controller");
const { isAuthenticated } = require("../middleware/checkauth");

const router = require("express").Router();
router.post("/createSettings", isAuthenticated, createSettings);
router.get("/getSettings", isAuthenticated, getSettings);
router.patch("/updateSettings", isAuthenticated, updateSettings);
router.delete("/deleteSettings", isAuthenticated, deleteSettings);

const settingsRouter = router;
module.exports = settingsRouter;
