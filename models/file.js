const mongoose =  require("mongoose");

const fileModel = new mongoose.Schema(
    {fileName: {type:String, required: true, unique: true}, folderName:{type:String}, fileData: {type:String} }
);

module.exports = mongoose.model("File", fileModel);

