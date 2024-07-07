const express = require("express");
require('dotenv').config();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const secret_key = process.env.secret_key;


const loginRouter = express.Router();

loginRouter.post("/", (req, res) => {
    const usersBuf = fs.readFileSync("./users.json", "utf-8");
    const users = JSON.parse(usersBuf);
    const userItem = req.body;
    const findUser = users.find(user => user.email === userItem.email && user.password === userItem.password);
    if (!findUser) {
        return res.status(401).json({ message: "user not found" });
    }
    const token = jwt.sign({ email: findUser.email }, secret_key);
    res.status(200).json({ token });    
})

module.exports = loginRouter;