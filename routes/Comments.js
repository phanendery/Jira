const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
const Comment = require("../models/Comment");

//delete,create,get all by issue ID, post
router.post(":issueId/newComment", (req, res) => {
  const issueId = req.params.issueId;
  const userId = 1; //hard coded for now
  const newComment = new Comment({
    body: req.body.body,
    forIssue: issueId,
    author: userId,
  });
});

router.get(":issueId/comments", (req, res) => {
  const issueId = req.params.issueId;
  Mongoose.find({ author: issueId }, (err, comments) => {
    const commentsMap = {};
    comments.forEach((comment) => {
      commentsMap[comment._id] = comment;
    });
    res.send(commentsMap);
  });
});

router.delete("/:commentId", (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).send({
          message: "Comment not found with id" + req.params.commentId,
        });
      }
      res.send({ message: "Comment deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Comment not found with id" + req.params.commentId,
        });
      }
      return res.status(500).send({
        message: "Error deleting comment with id" + req.params.commentId,
      });
    });
});

router.put("/:commentId", (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      body: req.body.body,
    },
    {
      new: true,
    }
  )
    .then((comment) => {
      if (!comment) {
        return res.status(404).send({
          message: "Comment not found with id" + req.params.commentId,
        });
      }
      res.send(comment);
    })
    .catch((err) => {
      if (comment.kind === "ObjectId") {
        return res.status(404).send({
          message: "Comment not found with id" + req.params.commentId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving comment with id" + req.params.commentId,
      });
    });
});
