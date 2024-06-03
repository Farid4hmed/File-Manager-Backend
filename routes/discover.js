const Router = require("express");
const route = Router();

const Folder = require("../models/folder");
const File = require("../models/file");

const express = require("express");
const app = express();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

// Create a new folder
route.post("/folder/create", async (req, res, next) => {
    try {
        const { foldername, email } = req.body;
        const newFolder = { folderName: foldername, email: email };
        const result = await Folder.create(newFolder);
        if (result) res.status(201).send("Folder Created Successfully");
        else res.status(400).send("Folder Creation Unsuccessful!");
    } catch (err) {
        next(err);
    }
});

// Get folders by email
route.get("/folders/:email", async (req, res, next) => {
    try {
        const email = req.params.email;
        const folders = await Folder.find({ email: email });
        res.status(200).send(folders);
    } catch (err) {
        next(err);
    }
});

// Create a new file
route.post('/file/create', async (req, res, next) => {
    try {
        console.log(req.body);
        const { fileName, folderName, fileData, email } = req.body;

        // Delete the existing file if it exists
        const response = await File.findOneAndDelete({ fileName: fileName, email: email });
        console.log('resp', response)
        // Create the new file
        const newFile = { fileName, folderName, fileData, email };
        const result = await File.create(newFile);

        if (result) {
            res.status(201).send('File Created Successfully');
        } else {
            res.status(400).send('File Creation Unsuccessful!');
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// Get files by folder name and email
route.get("/files/:folderName/:email", async (req, res, next) => {
    try {
        const { folderName, email } = req.params;
        const files = await File.find({ folderName: folderName, email: email });
        res.status(200).send(files);
    } catch (err) {
        next(err);
    }
});

// Get all files by email
route.get("/files", async (req, res, next) => {
    try {
        const email = req.query.email;
        const files = await File.find({ email: email });
        res.status(200).send(files);
    } catch (err) {
        next(err);
    }
});

module.exports = route;
