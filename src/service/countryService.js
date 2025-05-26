const Country = require("../model/Country");
const Level = require("../model/Level");

const addCountry = async (data) => {
  try {
    const newCountry = new Country(data);
    return await newCountry.save();
  } catch (error) {
    throw new Error("Error adding country: " + error.message);
  }
};

const getCountries = async () => {
  try {
    return await Country.find();
  } catch (error) {
    throw new Error("Error fetching countries: " + error.message);
  }
};

const getCountry = async (id) => {
  try {
    return await Country.findById(id);
  } catch (error) {
    throw new Error("Error fetching country: " + error.message);
  }
};

const editCountry = async (id, data) => {
  try {
    return await Country.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error("Error updating country: " + error.message);
  }
};

const deleteCountry = async (id) => {
  try {
    return await Country.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting country: " + error.message);
  }
};

const getCountryLevels = async (countryId) => {
  try {
    return await Level.find({ countryId });
  } catch (error) {
    throw new Error("Error fetching country levels: " + error.message);
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
