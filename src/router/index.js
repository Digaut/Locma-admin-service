const admin = require("../controller/admin.controller");
const home = require("../controller/cms.controller");
const { CategoryValidator } = require("../middleware/velidator");

const cmsRouter = require("./cmsRouter");
const { OkResponse } = require("../helper/response");
const userRouter = require("./userRouter");
const router = require("express").Router();

// router.post("/admin/login", admin.login);
// router.post("/admin", admin.create);
// router.post("/home", home.create);
// router.get("/home", home.get);
// router.post("/offers", home.createOffers);
// router.get("/offers", home.getOffers);
// router.post("/offers/get-products", home.getOfferDetails);
// router.post("/category/create", CategoryValidator, create);
// router.get('/category/all', getCategories);
// router.post("/subcategory/create", subcategory.create);
// router.get("/subcategory/getAll", subcategory.getAll);
// router.post("/subcategory/getByCategory", subcategory.getByCategory);
// router.post("/admin/settelment/create", admin.createSettelmentAmount);
// router.get("/admin/settelment/getAll", admin.getSettelmentAmount);
// router.post("/admin/settelment/get", admin.getOneSettelmentAmount);
// router.patch("/admin/settelment/update", admin.updateSettelMentAmount);
router.use("/admin/user", userRouter);

router.use("/admin/cms", cmsRouter);

module.exports = router;
