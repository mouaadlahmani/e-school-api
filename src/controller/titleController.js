const titleService = require("../service/titleService");

const addTitle = async (req, res) => {
  try {
    const result = await titleService.addTitle(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add title", error });
  }
};

const getTitles = async (req, res) => {
  try {
    const result = await titleService.getTitles();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get titles", error });
  }
};

const getTitle = async (req, res) => {
  try {
    const result = await titleService.getTitle(req.params.id);
    if (!result) return res.status(404).json({ message: "Title not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get title", error });
  }
};

const editTitle = async (req, res) => {
  try {
    const result = await titleService.editTitle(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: "Title not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update title", error });
  }
};

const deleteTitle = async (req, res) => {
  try {
    const result = await titleService.deleteTitle(req.params.id);
    if (!result) return res.status(404).json({ message: "Title not found" });
    res.status(200).json({ message: "Title deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete title", error });
  }
};

const getTitleFolders = async (req, res) => {
  try {
    const result = await titleService.getTitleFolders(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get folders", error });
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
