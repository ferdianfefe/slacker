const router = require("express").Router();
const multer = require("multer");
const sharp = require("sharp");
const Post = require("../model/Post");
const verifyToken = require("../middleware/verifyToken");

// Create post route
router.post(
  "/",
  verifyToken,
  multer().single("postImage"),
  async (req, res) => {
    const { type, text } = req.body;
    let outputImg = null;
    if (type != "text") {
      outputImg = await sharp(req.file.buffer)
        .resize(200, 200)
        .toFormat("png")
        .toBuffer();
    }
    const newPost = new Post({
      creator: req.user._id,
      type: type,
      caption: text,
      postImage: outputImg,
    });

    newPost.save().then((saved) => {
      if (saved)
        return res.status(203).json({
          success: true,
          message: "Posted successfully",
        });

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
  }
);

// Get posts route
router.get("/", verifyToken, (req, res) => {
  Post.find()
    .populate("creator")
    .then((posts) => {
      res.status(200).json({
        success: true,
        value: posts,
      });
    });
});

module.exports = router;
