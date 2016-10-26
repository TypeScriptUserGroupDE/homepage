import express = require("express");
import jwt = require("jsonwebtoken");
import _ = require("lodash");
import {JwtRequest} from "./../common/interfaces/JwtRequest";
import {SearchRequest} from "./../common/interfaces/SearchRequest";
import request = require("request-promise");
import {model as UserModel} from "./../models/User";
import {User} from "./../models/User";
import Config from "../config/config";

class SitemapCtrl {

    routes(app: express.Application, baseRoute: string) {
        app.get(baseRoute, this.generateSitemap);
    }

    generateSitemap(req: express.Request, res: express.Response) {

        UserModel
            .find({"active": true}, 'login')
            .lean()
            .exec(done);

        function done(err: any, result: any) {
            if (err) {
                console.log("err");
                return
            }

            res.render('sitemap', {
                users: result
            });
        }
    }
}

export default new SitemapCtrl();