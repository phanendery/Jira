const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

//get all projects
router.get("/", (req, res) => {
  Project.find()
    .then((projects) => {
      res.send(projects);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "You broke the clone D:",
      });
    });
});

//get specific project
router.get("/:projectId", (req, res) => {
  Project.findById(req.params.projectId)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Project not found with id" + req.params.projectId,
        });
      }
      res.send(project);
    })
    .catch((err) => {
      if (project.kind === "ObjectId") {
        return res.status(404).send({
          message: "Project not found with id" + req.params.projectId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving project with id" + req.params.projectId,
      });
    });
});

//create new project
router.post("/newProject", (req, res) => {
  Project.findOne({ name: req.body.name }).then((project) => {
    if (project) {
      return res
        .status(400)
        .json({ name: "That project name is already in use" });
    } else {
      const newProject = new Project({
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
        category: req.body.category,
      });

      newProject
        .save()
        .then((project) => res.send(project))
        .catch((err) => res.send(err));
    }
  });
});

//update project
router.put("/:projectId", (req, res) => {
  Project.findByIdAndUpdate(
    req.params.projectId,
    {
      name: req.body.name,
      url: req.body.url,
      description: req.body.description,
      category: req.body.category,
    },
    { new: true }
  )
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Project not found with id" + req.params.projectId,
        });
      }
      res.send(project);
    })
    .catch((err) => {
      if (project.kind === "ObjectId") {
        return res.status(404).send({
          message: "Project not found with id" + req.params.projectId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving project with id" + req.params.projectId,
      });
    });
});

//delete a project
router.delete("/:projectId", (req, res) => {
  Project.findByIdAndRemove(req.params.projectId)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Project not found with id" + req.params.projectId,
        });
      }
      res.send({ message: "Project deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Project not found with id" + req.params.projectId,
        });
      }
      return res.status(500).send({
        message: "Error deleting project with id" + req.params.projectId,
      });
    });
});

module.exports = router;
