const mongoose = require("mongoose")

const qrSchema = mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("QR", qrSchema);
