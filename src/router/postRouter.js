const {
  createPost,
  getAllPost,
  getPost,
  getStatistics,
  cmsPosts,
} = require("../controller/post.controller");

const router = require("express").Router();
router.post("/create", createPost);
router.get("/getAll", getAllPost);
router.get("/getPost", getPost);
router.get("/getStatistics", getStatistics);
router.get("/cmsPosts", cmsPosts);
const postRouter = router;
module.exports = postRouter;
