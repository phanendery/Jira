const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    listPosition: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionText: {
      type: String,
      required: true,
    },
    estimate: {
      type: Number,
    },
    timeSpent: {
      type: Number,
    },
    timeRemaining: {
      type: Number,
    },
    //issue has many comments
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    //project has many issues
    forProject: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    //issue has many users
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = Issue = mongoose.model("issues", IssueSchema);
