const envJson = require(`${__dirname}/env/env.json`);
const port = process.env.PORT ? envJson.port : 3001;
require('dotenv').config();
const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const {sequelize} = require('./models');

const bodyParser = require("body-parser");
const app = express();
const methodOverride = require('method-override');

sequelize.sync().then(()=> {
  console.log("연결 성공");
}).catch(err =>{
  console.log("실패");
  console.log(err);
});
const cors = require("cors");

var corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(methodOverride('_method'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave:false,
  saveUninitialized: false,
  secret : process.env.COOKIE_SECRET,
  cookie : {
    httpOnly:true,
    secure: false,
  },
}));
app.use(flash());

app.use(require(`${__dirname}/middleware/init`));
app.use(require(`${__dirname}/middleware/db`));

app.use("/board", require(`${__dirname}/route/base/board`));
app.use("/member", require(`${__dirname}/route/base/member`));
app.use("/barn", require(`${__dirname}/route/base/barn`));
app.use("/livestock", require(`${__dirname}/route/base/livestock`));
app.use("/lsbs", require(`${__dirname}/route/base/ls_bs`));
app.use("/planner", require(`${__dirname}/route/base/planner`));
app.use("/faq", require(`${__dirname}/route/base/faq`));
app.use("/reply", require(`${__dirname}/route/base/reply`));
app.use("/auth", require(`${__dirname}/route/base/auth/auth`));

app.get("/", function(req, res) {
  res.send("가축 관리 시스템");
});

app.listen(port, () => {
  console.log(`Backend start ${port}!`);
});
