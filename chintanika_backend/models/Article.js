const mongoose = require("mongoose");
const { Schema } = mongoose;

//unique title and content of article
//tag -->0:philosophy
const ArticleSchema = new mongoose.Schema({
  //foreign key user ref user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    unique: true,
  },
  view_counts: {
    type: Number,
    default: 0,
  },
  like_counts: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
  },
  pub_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("article", ArticleSchema);
