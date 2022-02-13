const router = require("express").Router();
const {
  createCity,
  getCity,
  updateCity,
  deleteCity,
  addPinCode,
} = require("../controller/activeCity.controller");
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
  searchCity,
} = require("../controller/cms.controller");
const homeController = require("../controller/cms.controller");
const {
  createGlobalVariables,
  getGlobalVariable,
  updateGlobalVariable,
  deleteGlobalVariable,
  searchGlobalVariableName,
} = require("../controller/globalVariables.controller");
const { getBySubCategory } = require("../controller/subcategory.controller");

const {
  CategoryValidator,
  SubCategoryValidator,
} = require("../middleware/velidator");
router.post("/home", homeController.create);
router.get("/home", homeController.get);
router.post("/offers", homeController.createOffers);
router.get("/offers", homeController.getOffers);
router.post("/offers/get-products", homeController.getOfferDetails);

router.post("/category/create", CategoryValidator, createCategory);
router.post("/subcategory/create", SubCategoryValidator, createSubCategory);
router.post("/subcategory/getByCategory", getBySubCategoryCategory);
router.get("/category/all", getCategories);
router.get("/subcategory/getAll", getAllSubCategory);
router.post("/subcategory/getBySubCategory", getBySubCategory);
router.patch("/category/update", updateCategory);
router.patch("/subcategory/update", updateSubCategory);
router.post("/category/delete", deleteCategory);
router.post("/subcategory/delete", deleteSubCategory);
router.post("/create/activeCity", createCity);
router.get("/get/activeCity", getCity);
router.get("/get/activeCity", getCity);
router.patch("/update/activeCity", updateCity);
router.post("/delete/activeCity", deleteCity);
router.patch("/add/newPinCode", addPinCode);
router.post("/searchCity", searchCity);
router.post("/create/globalVariable", createGlobalVariables);
router.get("/get/globalVariable", getGlobalVariable);
router.patch("/update/globalVariable", updateGlobalVariable);
router.post("/delete/globalVariable", deleteGlobalVariable);
router.post("/search/globalVariable", searchGlobalVariableName);

const cmsRouter = router;
module.exports = cmsRouter;
