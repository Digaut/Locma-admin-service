const router = require("express").Router();

const {
  getCategoriesUser,
  getAllSubCategoryUser,
  getBySubCategoryCategoryUser,
} = require("../controller/user.controller");

router.get("/category/all", getCategoriesUser);
router.get("/subcategory/getAll", getAllSubCategoryUser);
router.post("/subcategory/getByCategory", getBySubCategoryCategoryUser);
const userRouter = router;
module.exports = userRouter;
