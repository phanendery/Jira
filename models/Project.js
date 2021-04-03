const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    //project has many issues
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
    //project has many users
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = Project = mongoose.model("projects", ProjectSchema);
