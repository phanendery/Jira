const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    //user has many comments
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    //issue has many comments
    forIssue: {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  },
  { timestamps: true }
);

module.exports = Comment = mongoose.model("comments", CommentSchema);
