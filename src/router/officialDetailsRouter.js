const {
  createOfficialDetails,
  getOfficialDetails,
  updateOfficialDetails,
  testController,
} = require("../controller/officialDetails.controller");
const { isAuthenticated } = require("../middleware/checkauth");

const router = require("express").Router();
router.post("/create/officialDetails", createOfficialDetails);
router.post("/get/officialDetails", getOfficialDetails);
router.patch("/update/officialDetails", updateOfficialDetails);
router.get("/get/test", testController);
const officialDetailsRouter = router;
module.exports = officialDetailsRouter;
