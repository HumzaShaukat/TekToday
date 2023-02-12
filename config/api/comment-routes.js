const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/:postid", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      body: req.body.body,
      user_id: req.body.user_id,
      post_id: req.params.postid,
    });
    res.status(200).json({ message: "Comment posted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error posting comment" });
  }
});

router.put("/:commentid", withAuth, async (req, res) => {
  try {
    const updateComment = await Comment.update(
      {
        body: req.body.body,
        user_id: req.body.user_id,
        post_id: req.body.post_id,
      },
      {
        where: {
          id: req.params.commentid,
        },
      }
    );
    if (!updateComment) {
      res.status(400).json({ message: "Error updating comment" });
      return;
    }
    res.status(200).json({ message: "Comment updated successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:commentid", withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.commentid,
      },
    });
    if (!deleteComment) {
      res.status(400).json({ message: "Unable to delete comment" });
      return;
    }
    res.status(200).json({ message: "Comment successfully updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
