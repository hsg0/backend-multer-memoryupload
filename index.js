require("dotenv").config();
const { connectMongoDB } = require("./config/connect-mongoDB.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const UploadData = require("./models/upload-data.js");
const upload = require("./multer-setup.js");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectMongoDB();

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Save file data to MongoDB
    const image = await UploadData.create({
      name: req.file.originalname,
      image: req.file.buffer,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      imageId: image._id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.get("/show", async (req, res) => {
  try {
    const files = await UploadData.find(); // ✅ Fetch all files
    const data = { files }; // ✅ Prepare data object
    res.render("show", data); // ✅ Pass data to EJS
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
