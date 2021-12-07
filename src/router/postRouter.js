const {
  createPost,
  getAllPost,
  getPost,
  getStatistics,
} = require("../controller/post.controller");

const router = require("express").Router();
router.post("/create", createPost);
router.get("/getAll", getAllPost);
router.get("/getPost", getPost);
router.get("/getStatistics", getStatistics);
const postRouter = router;
module.exports = postRouter;
