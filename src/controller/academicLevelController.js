const academicLevelService = require("../service/academicLevelService");

const addAcademicLevel = async (req, res) => {
  try {
    const result = await academicLevelService.addAcademicLevel(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add academic level", error });
  }
};

const getAcademicLevels = async (req, res) => {
  try {
    const result = await academicLevelService.getAcademicLevels();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get academic levels", error });
  }
};

const getAcademicLevel = async (req, res) => {
  try {
    const result = await academicLevelService.getAcademicLevel(req.params.id);
    if (!result) return res.status(404).json({ message: "Academic level not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get academic level", error });
  }
};

const editAcademicLevel = async (req, res) => {
  try {
    const result = await academicLevelService.editAcademicLevel(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: "Academic level not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update academic level", error });
  }
};

const deleteAcademicLevel = async (req, res) => {
  try {
    const result = await academicLevelService.deleteAcademicLevel(req.params.id);
    if (!result) return res.status(404).json({ message: "Academic level not found" });
    res.status(200).json({ message: "Academic level deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete academic level", error });
  }
};

const getAcademicLevelSubjects = async (req, res) => {
  try {
    const result = await academicLevelService.getAcademicLevelSubjects(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get subjects", error });
  }
};

module.exports = {
  addAcademicLevel,
  getAcademicLevels,
  getAcademicLevel,
  editAcademicLevel,
  deleteAcademicLevel,
  getAcademicLevelSubjects,
};
