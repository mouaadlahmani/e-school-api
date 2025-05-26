const mongoose = require("mongoose");

const LevelSchema = mongoose.Schema({
    countryId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const levelModel = mongoose.model("Level", LevelSchema);

module.exports = levelModel;