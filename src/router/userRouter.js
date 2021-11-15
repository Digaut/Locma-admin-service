const router = require("express").Router();

const {
  getCategoriesUser,
  getAllSubCategoryUser,
  getBySubCategoryCategoryUser,
  getActiveCityForUser,
} = require("../controller/user.controller");

router.get("/category/all", getCategoriesUser);
router.get("/subcategory/getAll", getAllSubCategoryUser);
router.get("/get/activeCity", getActiveCityForUser);
router.post("/subcategory/getByCategory", getBySubCategoryCategoryUser);
const userRouter = router;
module.exports = userRouter;
