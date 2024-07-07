const express = require("express");
require('dotenv').config();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const secret_key = process.env.secret_key;

const protectionModule = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {        
        return res.render("login");
    }

    const token = auth.split(" ")[1];
    jwt.verify(token, secret_key, (err) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }
    });    
    return next();
}

module.exports = protectionModule;