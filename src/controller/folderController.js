const folderService = require("../service/folderService");
const path = require("path");
const fs = require("fs");

const addFolder = async (req, res) => {
  try {
    const result = await folderService.addFolder(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add folder", error });
  }
};

const getFolders = async (req, res) => {
  try {
    const result = await folderService.getFolders();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get folders", error });
  }
};

const getFolder = async (req, res) => {
  try {
    const result = await folderService.getFolder(req.params.id);
    if (!result) return res.status(404).json({ message: "Folder not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get folder", error });
  }
};

const uploadPdfToFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    const filePath = `/uploads/pdfs/${req.file.filename}`;

    const result = await folderService.addPdfToFolder(folderId, filePath);
    res.status(200).json({ _id: req.file.filename, url: filePath });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload PDF", error });
  }
};

const deletePdfFromFolder = async (req, res) => {
  try {
    const { folderId, pdfId } = req.params;
    const folder = await folderService.getFolder(folderId);
    const pdfUrl = folder.pdfList.find(p => p.includes(pdfId));
    if (!pdfUrl) return res.status(404).json({ message: "PDF not found in folder" });

    // Delete file from disk
    const fullPath = path.join(__dirname, "..", pdfUrl);
    fs.unlink(fullPath, async (err) => {
      if (err) return res.status(500).json({ message: "Failed to delete file", err });

      await folderService.removePdfFromFolder(folderId, pdfUrl);
      res.status(200).json({ message: "PDF deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete PDF", error });
  }
};

module.exports = {
  addFolder,
  getFolders,
  getFolder,
  uploadPdfToFolder,
  deletePdfFromFolder,
};
