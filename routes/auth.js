const Router = require("express");
const route = Router();

const Pin = require("../models/pin");

route.get("/setPin/:pin", async (req, res, next) => {
    try{
        const pin = req.params.pin;

        if (!pin)res.status(400).send("Bad Request");

        const newPin = { pin: pin };
        await Pin.create(newPin);
        res.send("Pin set successfully!");
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/verifyPin/:pin", async (req, res, next) => {
    try{
        const pin = req.params.pin;

        if(!pin)res.status(400).send("Bad Request");

        const thePin = await Pin.findOne({ pin : pin });

        if(thePin){
            res.send("Authorized");
        }
        else {
            res.send("Unauthorized")
        }

    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/status", async (req, res, next) => {
    try{
        Pin.findOne({}, (err, data) => {
            if(err)console.log(err);
            else { 
                if(!data){
                res.send(false);
                }
                else res.send(true);
            }
        });

    }
    catch(err){
        console.log(err);
        next(err);
    }
});


module.exports = route;