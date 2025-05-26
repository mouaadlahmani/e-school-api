const Title = require("../model/Title");
const Folder = require("../model/Folder");

const addTitle = async (data) => {
  try {
    const newTitle = new Title(data);
    return await newTitle.save();
  } catch (error) {
    throw new Error("Error adding title: " + error.message);
  }
};

const getTitles = async () => {
  try {
    return await Title.find();
  } catch (error) {
    throw new Error("Error fetching titles: " + error.message);
  }
};

const getTitle = async (id) => {
  try {
    return await Title.findById(id);
  } catch (error) {
    throw new Error("Error fetching title: " + error.message);
  }
};

const editTitle = async (id, data) => {
  try {
    return await Title.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error("Error updating title: " + error.message);
  }
};

const deleteTitle = async (id) => {
  try {
    return await Title.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting title: " + error.message);
  }
};

const getTitleFolders = async (titleId) => {
  try {
    return await Folder.find({ titleId: titleId });
  } catch (error) {
    throw new Error("Error fetching folders for title: " + error.message);
  }
};

module.exports = {
  addTitle,
  getTitles,
  getTitle,
  editTitle,
  deleteTitle,
  getTitleFolders,
};
