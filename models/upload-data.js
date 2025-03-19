const mongoose = require("mongoose");

const uploadDataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: Buffer,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UploadData = mongoose.model("UploadData", uploadDataSchema);

module.exports = UploadData;
