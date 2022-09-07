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
    updatePost,
} = require("../controller/post.controller");
const {
    postUpdateValidator,
    postValidator,
} = require("../middleware/velidator");

const router = require("express").Router();
router.post("/create", postValidator, createPost);
router.get("/getAll", getAllPost);
router.post("/get/home-page", getAllPostTypeWise);
router.post("/getPost", getPost);
router.get("/getStatistics", getStatistics);
router.post("/deletePost", deletePost);
router.post("/update", postUpdateValidator, updatePost);

const postRouter = router;
module.exports = postRouter;
