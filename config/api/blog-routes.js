const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.body.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updBlog = await BlogPost.update(
      {
        title: req.body.title,
        body: req.body.body,
        user_id: req.body.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updBlog) {
      res.status(400).json({ message: "Could not update blog post!" });
      return;
    }
    res.status(200).json({ message: "Post updated successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const delBlog = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delBlog) {
      res.status(400).json({ message: "Error deleting post" });
      return;
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
