const router = require("express").Router();
const adminController = require("../controller/admin.controller");

const {
  createCategory,
  createSubCategory,
  getAllSubCategory,
  getBySubCategoryCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controller/cms.controller");
const homeController = require("../controller/cms.controller");

const { CategoryValidator } = require("../middleware/velidator");
router.post("/home", homeController.create);
router.get("/home", homeController.get);
router.post("/offers", homeController.createOffers);
router.get("/offers", homeController.getOffers);
router.post("/offers/get-products", homeController.getOfferDetails);

router.post("/category/create", CategoryValidator, createCategory);
router.post("/subcategory/create", createSubCategory);
router.post("/subcategory/getByCategory", getBySubCategoryCategory);
router.get("/category/all", getCategories);
router.get("/subcategory/getAll", getAllSubCategory);
router.patch("/category/update", updateCategory);
router.patch("/subcategory/update", updateSubCategory);
router.post("/category/delete", deleteCategory);
router.post("/subcategory/delete", deleteSubCategory);

const cmsRouter = router;
module.exports = cmsRouter;
