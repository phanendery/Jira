const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");

//create, delete, update,

//get specific issue
router.get("/:issueId", (req, res) => {
  Issue.findById(req.params.issueId)
    .then((issue) => {
      if (!issue) {
        return res.status(404).send({
          message: "Issue not found with id" + req.params.issueId,
        });
      }
      res.send(issue);
    })
    .catch((err) => {
      if (issue.kind === "ObjectId") {
        return res.status(404).send({
          message: "Issue not found with id" + req.params.issueId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving issue with id" + req.params.issueId,
      });
    });
});

//delete an issue
router.delete("/:issueId", (req, res) => {
  Issue.findByIdAndRemove(req.params.issueId)
    .then((issue) => {
      if (!issue) {
        return res.status(404).send({
          message: "Issue not found with id" + req.params.issueId,
        });
      }
      res.send({ message: "Issue deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Issue not found with id" + req.params.issueId,
        });
      }
      return res.status(500).send({
        message: "Error deleting issue with id" + req.params.issueId,
      });
    });
});

module.exports = router;
