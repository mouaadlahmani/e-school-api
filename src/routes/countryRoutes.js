const express = require("express");
const router = express.Router();
const countryController = require("../controller/countryController");

router.post("/", countryController.addCountry);
router.get("/", countryController.getCountries);
router.get("/:id", countryController.getCountry);
router.put("/:id", countryController.editCountry);
router.delete("/:id", countryController.deleteCountry);
router.get("/levels/:id", countryController.getCountryLevels);

module.exports = router;
