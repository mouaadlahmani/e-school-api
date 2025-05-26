const subjectService = require("../service/subjectService");

const addSubject = async (req, res) => {
  try {
    const result = await subjectService.addSubject(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add subject", error });
  }
};

const getSubjects = async (req, res) => {
  try {
    const result = await subjectService.getSubjects();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get subjects", error });
  }
};

const getSubject = async (req, res) => {
  try {
    const result = await subjectService.getSubject(req.params.id);
    if (!result) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get subject", error });
  }
};

const editSubject = async (req, res) => {
  try {
    const result = await subjectService.editSubject(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update subject", error });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const result = await subjectService.deleteSubject(req.params.id);
    if (!result) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subject", error });
  }
};

const getSubjectTitles = async (req, res) => {
  try {
    const result = await subjectService.getSubjectTitles(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get titles", error });
  }
};

module.exports = {
  addSubject,
  getSubjects,
  getSubject,
  editSubject,
  deleteSubject,
  getSubjectTitles,
};
