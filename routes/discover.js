const Router = require("express");
const route = Router();

const Folder = require("../models/folder");
const File = require("../models/file");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route.get("/folder/create/:foldername/:email", async (req, res, next) => {
    try {
        const folderName = req.params.foldername;
        const email = req.params.email;
        const newFolder = { folderName: folderName, email: email };
        const result = await Folder.create(newFolder);
        if (result) res.send("Folder Created Successfully");
        else res.send("Folder Creation Unsuccessful!");
    }
    catch (err) {
        next(err);
    }
});

route.get("/getFolders/:email", (req, res, next) => {
    try {
        const email = req.params.email;
        Folder.find({ email: { $ne: null, $eq: email } }, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

route.get("/file/create", async (req, res, next) => {
    try {
        const fileName = req.query.fileName;
        const folderName = req.query.folderName;
        const fileData = req.query.fileData;
        const email = req.query.email;

        await File.findOneAndDelete({ fileName: fileName, email: email });
        const newFile = { fileName: fileName, folderName: folderName, fileData: fileData, email: email };
        const result = await File.create(newFile);

        if (result) res.send("Successful");
        else res.send("Unsuccessful");

    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

route.get("/getFiles/:folderName/:email", async (req, res, next) => {
    try {
        const folderName = req.params.folderName;
        const email = req.params.email;
        if (folderName) {
            File.find({ folderName: folderName, email: { $ne: null, $eq: email } }, (err, data) => {
                if (err) console.log(err);
                else { res.status(200).send(data); };
            });
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

route.get("/getFiles", async (req, res, next) => {
    try {
        const email = req.params.email
        File.find({ email: { $ne: null, $eq: email } }, (err, data) => {
            if (err) console.log(err);
            else { res.status(200).send(data); };
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});


module.exports = route;