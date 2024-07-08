const express = require("express");
require("dotenv").config();
const port = process.env.port;

const app = express();
const loginRouter = require("./routers/loginRouter");
const registrationRouter = require("./routers/registrationRouter");
const userRouter = require("./routers/userRouter");
const path = require('path');
const protectionModule = require("./modules/protectionModule");
const multer = require('multer');
const fs = require("fs");



app.set('view engine', 'ejs');
app.set(path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontEndScripts')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// add user's login and password in users.json
app.use("/api/registration", registrationRouter);
app.get("/registration", (req, res) => {
  res.render("register");
});
// generate token
app.use("/api/login", loginRouter);
app.get("/login", (req, res) => {
  res.render("login");
});
// get user's data
app.use("/api/user", protectionModule, (req, res) => {
  res.redirect("/user");
});
app.use("/user", userRouter);

//upload img to server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/upload'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === '/jpg') {
      return cb(null, true);
    }
    cb(new Error('File must be image'), false);
  },
});
app.use("/api/upload", upload.single("img"));
app.post("/api/upload", protectionModule, (req, res) => {
  const usersBuf = fs.readFileSync("users.json", "utf-8");
  const users = JSON.parse(usersBuf);

  const findUser = users.find(user => user.email === req.user.email);
  const img = req.file;
  findUser.images.push(img.filename);   
  fs.writeFileSync("users.json",  JSON.stringify(users, null, 2));
      
  res.status(201).json({ message: "Data received successfully" });
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});