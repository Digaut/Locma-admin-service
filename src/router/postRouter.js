const {
  createPost,
  getAllPost,
  getPost,
  getStatistics,
  cmsPosts,
  deletePost,
  getAllPoststypeWise,
  getAllPosttypeWise,
  getAllPostTypeWise,
} = require("../controller/post.controller");

const router = require("express").Router();
router.post("/create", createPost);
router.get("/getAll", getAllPost);
router.post("/get/home-page", getAllPostTypeWise);
router.post("/getPost", getPost);
router.get("/getStatistics", getStatistics);
router.post("/deletePost", deletePost);

const postRouter = router;
module.exports = postRouter;
