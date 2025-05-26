const express = require("express");
const router = express.Router();
const levelController = require("../controller/levelController");

router.post("/", levelController.addLevel);
router.get("/", levelController.getLevels);
router.get("/:id", levelController.getLevel);
router.put("/:id", levelController.editLevel);
router.delete("/:id", levelController.deleteLevel);
router.get("/academic/:id", levelController.getLevelAcademicLevels);

module.exports = router;
