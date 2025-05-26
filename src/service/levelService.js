const Level = require("../model/Level");
const AcademicLevel = require("../model/AcademicLevel");

const addLevel = async (data) => {
  try {
    const newLevel = new Level(data);
    return await newLevel.save();
  } catch (error) {
    throw new Error("Error adding level: " + error.message);
  }
};

const getLevels = async () => {
  try {
    return await Level.find();
  } catch (error) {
    throw new Error("Error fetching levels: " + error.message);
  }
};

const getLevel = async (id) => {
  try {
    return await Level.findById(id);
  } catch (error) {
    throw new Error("Error fetching level: " + error.message);
  }
};

const editLevel = async (id, data) => {
  try {
    return await Level.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error("Error updating level: " + error.message);
  }
};

const deleteLevel = async (id) => {
  try {
    return await Level.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting level: " + error.message);
  }
};

const getLevelAcademicLevels = async (levelId) => {
  try {
    return await AcademicLevel.find({ levelId });
  } catch (error) {
    throw new Error("Error fetching level academic levels: " + error.message);
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
