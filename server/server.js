const express = require("express");
require("dotenv").config();
const cors = require("cors");
const initRoutes = require("./src/routes");
const connectDatabase = require("./src/config/connectDatabase");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

import generateDate from "./src/utils/generateDate";
// const generateCode = require("./src/utils/generateCode");

// console.log("generate code ", generateCode.generateCode(4));
// console.log("generate code ", generateCode.generateCode23("duoi triệu"));
console.log("gera ", generateDate());

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

initRoutes(app);
connectDatabase();

// app.use("/", (req, res) => {
//   res.send("Sever on ...");
// });

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
