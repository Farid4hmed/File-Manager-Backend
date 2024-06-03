const mongoose = require("mongoose");

const folderModel = new mongoose.Schema(
    {
        folderName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true }
    }
);

module.exports = mongoose.model("Folder", folderModel);
