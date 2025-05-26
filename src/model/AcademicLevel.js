const mongoose = require("mongoose");

const AcademicLevelSchema = mongoose.Schema({
    levelId: {
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

const AcademiclevelModel = mongoose.model("AcademicLevel", AcademicLevelSchema);

module.exports = AcademiclevelModel;