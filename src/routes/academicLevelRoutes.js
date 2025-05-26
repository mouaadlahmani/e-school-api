const express = require("express");
const router = express.Router();
const academicLevelController = require("../controller/academicLevelController");

router.post("/", academicLevelController.addAcademicLevel);
router.get("/", academicLevelController.getAcademicLevels);
router.get("/:id", academicLevelController.getAcademicLevel);
router.put("/:id", academicLevelController.editAcademicLevel);
router.delete("/:id", academicLevelController.deleteAcademicLevel);
router.get("/subjects/:id", academicLevelController.getAcademicLevelSubjects);

module.exports = router;
