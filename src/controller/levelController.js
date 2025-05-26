const levelService = require("../service/levelService");

const addLevel = async (req, res) => {
  try {
    const result = await levelService.addLevel(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add level", error });
  }
};

const getLevels = async (req, res) => {
  try {
    const result = await levelService.getLevels();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get levels", error });
  }
};

const getLevel = async (req, res) => {
  try {
    const result = await levelService.getLevel(req.params.id);
    if (!result) return res.status(404).json({ message: "Level not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get level", error });
  }
};

const editLevel = async (req, res) => {
  try {
    const result = await levelService.editLevel(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: "Level not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update level", error });
  }
};

const deleteLevel = async (req, res) => {
  try {
    const result = await levelService.deleteLevel(req.params.id);
    if (!result) return res.status(404).json({ message: "Level not found" });
    res.status(200).json({ message: "Level deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete level", error });
  }
};

const getLevelAcademicLevels = async (req, res) => {
  try {
    const result = await levelService.getLevelAcademicLevels(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get academic levels", error });
  }
};

module.exports = {
  addLevel,
  getLevels,
  getLevel,
  editLevel,
  deleteLevel,
  getLevelAcademicLevels,
};
