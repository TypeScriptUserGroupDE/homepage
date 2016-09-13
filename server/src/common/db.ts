import mongoose = require("mongoose");
import Config from "../config/config";

export var init = () => {
    console.log('connecting to db');
    mongoose.connect('mongodb://127.0.0.1:' + Config.mongodb_port + '/typescriptusers');
};
