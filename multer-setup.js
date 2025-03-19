const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
// This file sets up the multer middleware for handling file uploads. It creates a memory storage engine to store the files in memory. The upload object is then exported to be used in other parts of the application.
// The upload object can be used as middleware in routes to handle file uploads. For example, in a route that handles file uploads, you can use the upload middleware like this:
// const express = require('express')
// const router = express.Router()
// const upload = require('../config/multer-setup.js')
