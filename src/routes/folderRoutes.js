const express = require("express");
const router = express.Router();
const folderController = require("../controller/folderController");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/pdfs/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/", folderController.addFolder);
router.get("/", folderController.getFolders);
router.get("/:id", folderController.getFolder);
router.post("/upload/:id", upload.single('pdf'), folderController.uploadPdfToFolder);
router.delete("/pdf/:folderId/:pdfId", folderController.deletePdfFromFolder);

module.exports = router;
