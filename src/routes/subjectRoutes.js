const express = require("express");
const router = express.Router();
const subjectController = require("../controller/subjectController");

router.post("/", subjectController.addSubject);
router.get("/", subjectController.getSubjects);
router.get("/:id", subjectController.getSubject);
router.put("/:id", subjectController.editSubject);
router.delete("/:id", subjectController.deleteSubject);
router.get("/titles/:id", subjectController.getSubjectTitles);

module.exports = router;
