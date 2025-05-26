const mongoose = require("mongoose");

const FolderSchema = mongoose.Schema({
    titleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pdfList: [{
        type: String
    }],
}, {
    timestamps: true
})

const folderModel = mongoose.model("Folder", FolderSchema);

module.exports = folderModel;