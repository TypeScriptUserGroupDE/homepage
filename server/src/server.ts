"use strict";
import express = require("express");
import cors = require("cors");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import db = require("./common/db");
import AuthCtrl  from "./routes/AuthCtrl";
import SitemapCtrl  from "./routes/SitemapCtrl";
import TestCtrl  from "./routes/TestCtrl";
import UserCtrl  from "./routes/UserCtrl";
import CityCtrl  from "./routes/CityCtrl";
import logger from "./common/logging";

process.on('uncaughtException', function (error:Error) {
    logger.log("error", error.stack);
    process.exit(1)
});

db.init();
var app = express();
app.listen(3002, 'localhost', function () {
    logger.log("info", "Server is running at port 3002");
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('views' , __dirname + '/views');
app.set('view engine', 'ejs');

/**
 *  Public Routes:
 * */
AuthCtrl.routes(app, "/api/login");
TestCtrl.routes(app, "/api/test");
SitemapCtrl.routes(app, "/api/sitemap");
UserCtrl.publicRoutes(app, "/api/user");
CityCtrl.publicRoutes(app, "/api/city");

/**
 *  Internal Routes
 * */
app.use(require("./middlewares/validateRequest"));
UserCtrl.protectedRoutes(app, "/api/user");