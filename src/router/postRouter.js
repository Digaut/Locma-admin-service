const {
  createPost,
  getAllPost,
  getPost,
  getStatistics,
  cmsPosts,
  deletePost,
} = require("../controller/post.controller");

const router = require("express").Router();
router.post("/create", createPost);
router.get("/getAll", getAllPost);
router.get("/getPost", getPost);
router.get("/getStatistics", getStatistics);
router.post("/deletePost", deletePost);

const postRouter = router;
module.exports = postRouter;
