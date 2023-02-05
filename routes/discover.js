const Router = require("express");
const route = Router();

const Folder = require("../models/folder");
const File = require("../models/file");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

route.get("/file/create", async (req, res, next) => {
    try{
        const fileName = req.query.fileName;
        const folderName = req.query.folderName;
        const fileData = req.query.fileData;
    
        const newFile = { fileName: fileName, folderName: folderName,  fileData: fileData };
        const result = await File.create(newFile);
        
        if(result)res.send("Successful");
        else res.send("Unsuccessful");

    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/getFiles/:folderName", async (req, res, next) => {
    try{
        const folderName = req.params.folderName;
        File.find({ folderName: folderName }, (err, data) => {
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