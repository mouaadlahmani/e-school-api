const express = require("express");
const router = express.Router();
const titleController = require("../controller/titleController");

router.post("/", titleController.addTitle);
router.get("/", titleController.getTitles);
router.get("/:id", titleController.getTitle);
router.put("/:id", titleController.editTitle);
router.delete("/:id", titleController.deleteTitle);
router.get("/folders/:id", titleController.getTitleFolders);

module.exports = router;
