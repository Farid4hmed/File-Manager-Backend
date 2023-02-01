const dotenv = require("dotenv");
dotenv.config();

const initDB = require("./config/db.js");
const express = require("express");
const app = express();

initDB();

// health api
app.get("/api/health", (req, res) => {
    res.send({
        time: new Date(),
        server: "Shuffle Backend",
        status: "Active",
    });
})




const port = process.env.PORT || 3000;
const host = process.env.HOST || `localhost`;

app.listen(port, () => {
    console.log(`Server is up and running at http://${host}:${port}`);
});1

