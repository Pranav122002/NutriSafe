const mongoose = require("mongoose");

const blogpostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
});

blogpostSchema.pre('find', function (next) {
  this.populate('comments.user');
  next();
});

mongoose.model("BLOGPOST", blogpostSchema);
