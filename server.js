const dotenv = require("dotenv");
dotenv.config();

const initDB = require("./config/db.js");
const express = require("express");
const cors = require("cors");
const app = express();

const auth = require("./routes/auth");
const discover = require("./routes/discover")

app.use(cors({ origin: "*"}));

initDB();

// health api
app.get("/api/health", (req, res) => {
    res.send({
        time: new Date(),
        server: "Shuffle Backend",
        status: "Active",
    });
})

app.use("/api/auth", auth);
app.use("/api/discover", discover);


// route not found middleware
app.use((req, res, next) =>
    res.status(404).send("You are looking for something that we do not have!")
);

//error handler middleware
app.use((err, req, res, next) => {
    res.status(500).send("Something went wrong! Please try after some time.");
});


const port = process.env.PORT || 7003;
const host = process.env.HOST || `localhost`;

app.listen(port, () => {
    console.log(`Server is up and running at http://${host}:${port}`);
});1

