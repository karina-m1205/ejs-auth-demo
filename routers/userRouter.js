const express = require("express");
require('dotenv').config();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const secret_key = process.env.secret_key;

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {    
    res.render("user");    
})

module.exports = userRouter;