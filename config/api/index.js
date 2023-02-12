const router = require("express").Router();
const userRoutes = require("./user-routes");
const commentRoutes = require("./comment-routes");
const blogRoutes = require("./blog-routes");

router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/blogs", blogRoutes);

module.exports = router;
