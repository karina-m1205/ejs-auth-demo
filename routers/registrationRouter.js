const express = require("express");
const fs = require("fs");

const registrationRouter = express.Router();

registrationRouter.post("/", (req, res) => {
    const usersBuf = fs.readFileSync("users.json", "utf-8");
    const users = JSON.parse(usersBuf);
    const userItem = req.body;
    userItem.images = [];

    if (userItem.username === "" || userItem.email === "" || userItem.password === "") {
        return res.status(401).json({ message: "enter all data" });
    }

    const findUser = users.find(user => user.email === userItem.email);
    if (findUser) {
        return res.status(401).json({ message: "user already exist" });
    }
    users.push(userItem);
    const userData = JSON.stringify(users, null, 2);

    fs.writeFileSync("users.json", userData);
    
    res.status(201).json({ message: 'user successfuly added' });
})

module.exports = registrationRouter;