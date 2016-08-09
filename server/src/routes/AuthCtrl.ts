import express = require("express");
import jwt = require("jsonwebtoken");
import _ = require("lodash/index");
import request = require("request-promise");
import {model as UserModel} from "./../models/User";
import {User} from "./../models/User";
import {PublicUser} from "../common/interfaces/PublicUser";
import Config from "../config/config";
import RequestPromise = require("request-promise");

class AuthCtrl {

    routes(app:express.Application, baseRoute:string) {
        app.post(baseRoute, this.signIn);
    }

    signIn(req:express.Request, res:express.Response) {
        var code:string = req.body.code || "";

        if (code === "") {
            AuthCtrl.cancel(res);
            return;
        }

        AuthCtrl.getToken(code)
            .then(function (req:any) {

                    if (req.access_token) {
                        var token = req.access_token;


                        AuthCtrl.getUserData(token)
                            .catch(function (err) {
                                console.log('err');
                            })
                            .then(function (req) {
                                UserModel.findOneAndUpdate({'github_id': req.id}, {$set: {'github_token': token}}, {'new': true}, next);

                                function next(err:any, user:User) {

                                    if (err) {
                                        console.log('err');
                                        return;
                                    } else if (!user) {
                                        var user = AuthCtrl.createUser(req, res, token);
                                    }

                                    res
                                        .status(200)
                                        .json(AuthCtrl.genJWT(user));
                                }

                            });

                    } else {
                        AuthCtrl.cancel(res);
                    }
                }
            );
    }


    static cancel(res:express.Response) {
        res
            .status(401)
            .json({
                "status": 401,
                "message": "Something went wrong."
            });
        return;
    };

    static getToken(code:string):any {

        let payload = {
            client_id: Config.github_client_id,
            client_secret: Config.github_client_secret,
            code: code
        };

        return request.post({
            url: 'https://github.com/login/oauth/access_token',
            formData: payload,
            headers: {
                accept: "application/json"
            },
            json: true
        })
    };

    static getUserData(token:string) {

        return request.get({
            url: 'https://api.github.com/user',
            headers: {
                "User-Agent": "typescriptusers.de App",
                "Authorization": 'token ' + token
            },
            json: true,
        }).then(function (req) {

            if (req.email === null) {
                return request.get({
                    url: 'https://api.github.com/user/emails',
                    headers: {
                        "User-Agent": "Awesome-Octocat-App",
                        "Authorization": 'token ' + token
                    },
                    json: true
                }).then(function (result:any) {
                    result = result.filter(function (result:any) {
                        return result.primary === true;
                    });

                    req.email = result[0].email;
                    return req;
                })
            }

            return req;
        });
    };

    static createUser(req:any, res:express.Response, token:string) {
        req.github_id = req.id;
        req.github_token = token;
        req.active = false;

        var user = new UserModel(req);
        user.save(done);

        var done = (err:any) => {
            if (err) {
                console.log('err');
                res.status(500);
                res.send('500 - Internal Error');
                return;
            }
        };
        return user
    };


    static genJWT(fullUser:User) {

        // todo: clean sensitive data
        const user:PublicUser = {
            userid: fullUser._id,
            github_id: fullUser.github_id,
            name: fullUser.name,
            html_url: fullUser.html_url,
            accessLevel: fullUser.accessLevel,
            avatar_url: fullUser.avatar_url,
            active: fullUser.active
        };


        var expires = "2 days"; // 2 days
        var token = jwt.sign(user, Config.jwt_secret, {
            expiresIn: expires
        });
        return {
            token: token,
            expires: expires,
            user: user,
        };
    }

}

export default new AuthCtrl();