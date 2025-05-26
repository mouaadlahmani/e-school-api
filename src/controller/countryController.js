const countryService = require("../service/countryService");

const addCountry = async (req, res) => {
  try {
    const result = await countryService.addCountry(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to add country", error });
  }
};

const getCountries = async (req, res) => {
  try {
    const result = await countryService.getCountries();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get countries", error });
  }
};

const getCountry = async (req, res) => {
  try {
    const result = await countryService.getCountry(req.params.id);
    if (!result) return res.status(404).json({ message: "Country not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get country", error });
  }
};

const editCountry = async (req, res) => {
  try {
    const result = await countryService.editCountry(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: "Country not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update country", error });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const result = await countryService.deleteCountry(req.params.id);
    if (!result) return res.status(404).json({ message: "Country not found" });
    res.status(200).json({ message: "Country deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete country", error });
  }
};

const getCountryLevels = async (req, res) => {
  try {
    const result = await countryService.getCountryLevels(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to get levels", error });
  }
};

module.exports = {
  addCountry,
  getCountries,
  getCountry,
  editCountry,
  deleteCountry,
  getCountryLevels,
};
