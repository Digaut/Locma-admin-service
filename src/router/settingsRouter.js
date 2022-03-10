const {
  createSettings,
  getSettings,
  updateSettings,
  deleteSettings,
} = require("../controller/settings.controller");

const router = require("express").Router();
router.post("/createSettings", createSettings);
router.post("/getSettings", getSettings);
router.patch("/updateSettings", updateSettings);
router.delete("/deleteSettings", deleteSettings);

const settingsRouter = router;
module.exports = settingsRouter;
