const Folder = require("../model/Folder");

const addFolder = async (data) => {
  try {
    const newFolder = new Folder(data);
    return await newFolder.save();
  } catch (error) {
    throw new Error("Error adding folder: " + error.message);
  }
};

const getFolders = async () => {
  try {
    return await Folder.find();
  } catch (error) {
    throw new Error("Error fetching folders: " + error.message);
  }
};

const getFolder = async (id) => {
  try {
    return await Folder.findById(id);
  } catch (error) {
    throw new Error("Error fetching folder: " + error.message);
  }
};

const addPdfToFolder = async (id, pdfUrl) => {
  try {
    return await Folder.findByIdAndUpdate(
      id,
      { $addToSet: { pdfList: pdfUrl } },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error adding PDF to folder: " + error.message);
  }
};

const removePdfFromFolder = async (id, pdfUrl) => {
  try {
    return await Folder.findByIdAndUpdate(
      id,
      { $pull: { pdfList: pdfUrl } },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error removing PDF from folder: " + error.message);
  }
};

module.exports = {
  addFolder,
  getFolders,
  getFolder,
  addPdfToFolder,
  removePdfFromFolder,
};
