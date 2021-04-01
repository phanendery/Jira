const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Comment = mongoose.model("comments", CommentSchema);
