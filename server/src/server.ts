"use strict";

import express = require("express");
import cors = require("cors");
import  bodyParser = require("body-parser");
import morgan = require("morgan");
import db = require("./common/db");
import AuthCtrl  from "./routes/AuthCtrl";
import UserCtrl  from "./routes/UserCtrl";

db.init();
var app = express();
app.listen(3002, function () {
    console.log("Server is running at port 3002");
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


/**
 *  Public Routes:
 * */

AuthCtrl.routes(app, "/api/login");
UserCtrl.publicRoutes(app, "/api/user");

/**
 *  Internal Routes
 * */
app.use(require("./middlewares/validateRequest"));
UserCtrl.protectedRoutes(app, "/api/user");