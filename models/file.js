const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
    {
        fileName: { type: String, required: true },
        folderName: { type: String },
        fileData: { type: String },
        email: { type: String, required: true }
    },
    { timestamps: true }
);

// Compound unique index to ensure unique fileName per email
fileSchema.index({ fileName: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('File', fileSchema);
