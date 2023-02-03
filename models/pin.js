const mongoose =  require("mongoose");

const pinModel = new mongoose.Schema(
    {pin: {type:Number, required:true} }
);

module.exports = mongoose.model("Pin", pinModel);

