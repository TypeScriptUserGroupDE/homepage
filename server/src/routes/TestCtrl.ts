import express = require("express");
import jwt = require("jsonwebtoken");
import _ = require("lodash/index");
import {JwtRequest} from "./../common/interfaces/JwtRequest";
import {SearchRequest} from "./../common/interfaces/SearchRequest";
import request = require("request-promise");
import {model as UserModel} from "./../models/User";
import {User} from "./../models/User";
import Config from "../config/config";

class TestCtrl {

    routes(app: express.Application, baseRoute: string) {
        app.get(baseRoute, this.test);
    }

    test(req: express.Request, res: express.Response) {
        console.log('tested');

        res
            .status(200)
            .json('200 - OK');
    }


}

export default new TestCtrl();