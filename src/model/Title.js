const mongoose = require("mongoose");

const TitleSchema = mongoose.Schema({
    subjectId: {
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

const titleModel = mongoose.model("Title", TitleSchema);

module.exports = titleModel;