import jwt = require("jsonwebtoken");
import express = require("express");
import Config from "../config/config";
import {JwtRequest} from "./../common/interfaces/JwtRequest";

export = function (req:JwtRequest, res:express.Response, next:Function) {

    var token = req.headers["x-access-token"];

    if (token) {
        // verify jwt
        jwt.verify(token, Config.jwt_secret, function (err:any, decoded:any) {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: "Failed to authenticate token.",
                    err: err
                });
            } else {
                // save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // no token -> error.
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
};