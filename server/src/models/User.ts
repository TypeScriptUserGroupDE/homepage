import mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

// import HashService from "./../common/services/HashService";
import {PublicUser} from "../common/interfaces/PublicUser";
var Schema = mongoose.Schema;


export interface IUser extends mongoose.Document, PublicUser {
    _id:typeof mongoose.Schema.Types.ObjectId;
}


export var UserSchema = new Schema(
    {
        github_id: {type: Number, unique: true},
        name: String,
        email: String,
        html_url: String,
        accessLevel: Number,
        avatar_url: String,
        github_token: String,
        active: Boolean,
        website: String,
        twitter: String,
        description: String,
        city: String,
        zip: Number,
        tec: String,
        latitude: Number,
        longitude: Number
    },
    {
        timestamps: true
    }
);

export var model = mongoose.model<User>("User", UserSchema);
