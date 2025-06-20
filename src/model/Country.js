const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: null,
        trim: true
    },
}, {
    timestamps: true
})

const countryModel = mongoose.model("Country", CountrySchema);

module.exports = countryModel;