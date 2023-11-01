const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: {
    type: String,
  },

  createUser : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  
  postId : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Post"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
