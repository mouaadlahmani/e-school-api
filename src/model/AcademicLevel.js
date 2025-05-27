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
    icon: {
        type: String,
        default: null,
        trim: true
    },
}, {
    timestamps: true
})

const AcademiclevelModel = mongoose.model("AcademicLevel", AcademicLevelSchema);

module.exports = AcademiclevelModel;