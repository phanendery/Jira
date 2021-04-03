const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    //user has many comments
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    //project has many users
    forProject: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);
