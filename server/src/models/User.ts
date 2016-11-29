import mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

import {PublicUser} from "../common/interfaces/PublicUser";
var Schema = mongoose.Schema;


export interface User extends mongoose.Document, PublicUser {
    _id: typeof mongoose.Schema.Types.ObjectId;
    github_id: number;
    login: string;
    name: string;
    email: string;
    html_url: string;
    accessLevel: number;
    avatar_url: string;
    github_token: string;
    active: boolean;
    website: string;
    twitter: string;
    company: string;
    company_url: string;
    description: string;
    city: string;
    zip: number;
    latitude: number;
    longitude: number;
    fieldSum: number;
    loc: number[],
    availability: {
        forProjects: boolean;
        greaterDistance: boolean;
    };
    tec: {
        nodejs: boolean;
        angularjs: boolean;
        angular2: boolean;
        ionic: boolean;
        nativescript: boolean;
    };
}

export var UserSchema = new Schema(
    {
        github_id: {type: Number, unique: true},
        login: {type: String, unique: true},
        name: String,
        email: String,
        html_url: String,
        accessLevel: Number,
        avatar_url: String,
        github_token: String,
        active: Boolean,
        website: String,
        twitter: String,
        company: String,
        company_url: String,
        description: String,
        city: String,
        zip: Number,
        loc: {
            type: [Number], // [0]: longitude, [1]: latitude
            index: '2dsphere'
        },
        // latitude: Number,
        // longitude: Number,
        fieldSum: Number,
        availability: {
            forProjects: {type: Boolean, default: false},
            greaterDistance: {type: Boolean, default: false}
        },
        tec: {
            nodejs: {type: Boolean, default: false},
            angularjs: {type: Boolean, default: false},
            angular2: {type: Boolean, default: false},
            ionic: {type: Boolean, default: false},
            nativescript: {type: Boolean, default: false}
        }
    },
    {
        timestamps: true
    }
);

export var model = mongoose.model<User>("User", UserSchema);
