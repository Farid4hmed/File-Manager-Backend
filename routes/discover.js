const Router = require("express");
const route = Router();

const Folder = require("../models/folder");


route.get("/folder/create/:foldername", async (req, res, next) => {
    try{
        const folderName = req.params.foldername;
        const newFolder = { folderName: folderName };
        const result = await Folder.create(newFolder);
        if(result)res.send("Folder Created Successfully");
        else res.send("Folder Creation Unsuccessful!");
    }
    catch(err){
        next(err);
    }
});

route.get("/getFolders", (req, res, next) => {
    try{
         Folder.find({}, (err, data) => {
            if(err)console.log(err);
            else { res.status(200).send(data); };
        });
    }
    catch(err){
        console.log(err);
        next(err);
    }
});





module.exports = route;