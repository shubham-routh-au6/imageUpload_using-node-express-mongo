const sharp = require("sharp");
const sharpConfig = (req) => {
  sharp(req.file.path)
    .resize(100, 100)
    .toFile(
      "images/" +
      req.file.originalname.slice(0, req.file.originalname.indexOf(".")) +
      `_thumbnails${req.file.originalname.slice(
        req.file.originalname.indexOf(".")
      )}`,
      (err, resizeImage) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Image resized successfully");
        }
      }
    );
};

module.exports = sharpConfig;
