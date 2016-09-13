import express = require("express");
import {PublicUser} from "./PublicUser";


export interface JwtRequest extends express.Request {
    decoded:PublicUser;
}