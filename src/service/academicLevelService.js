const AcademicLevel = require("../model/AcademicLevel");
const Subject = require("../model/Subject");

const addAcademicLevel = async (data) => {
  try {
    const newAcademicLevel = new AcademicLevel(data);
    return await newAcademicLevel.save();
  } catch (error) {
    throw new Error("Error adding academic level: " + error.message);
  }
};

const getAcademicLevels = async () => {
  try {
    return await AcademicLevel.find();
  } catch (error) {
    throw new Error("Error fetching academic levels: " + error.message);
  }
};

const getAcademicLevel = async (id) => {
  try {
    return await AcademicLevel.findById(id);
  } catch (error) {
    throw new Error("Error fetching academic level: " + error.message);
  }
};

const editAcademicLevel = async (id, data) => {
  try {
    return await AcademicLevel.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error("Error updating academic level: " + error.message);
  }
};

const deleteAcademicLevel = async (id) => {
  try {
    return await AcademicLevel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting academic level: " + error.message);
  }
};

const getAcademicLevelSubjects = async (academicLevelId) => {
  try {
    return await Subject.find({ academicLevelId });
  } catch (error) {
    throw new Error("Error fetching academic level subjects: " + error.message);
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
