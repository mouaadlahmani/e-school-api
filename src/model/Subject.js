const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
    academicLevelId: {
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

const subjectModel = mongoose.model("subject", SubjectSchema);

module.exports = subjectModel;