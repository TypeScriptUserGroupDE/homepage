import express = require("express");
import jwt = require("jsonwebtoken");
import _ = require("lodash/index");
import {JwtRequest} from "./../common/interfaces/JwtRequest";
import request = require("request-promise");
import {model as User} from "./../models/User";


class UserCtrl {

    publicRoutes(app:express.Application, baseRoute:string) {
        app.post(baseRoute + "/get", this.getSingleUser);
        app.get(baseRoute + "/get/all", this.getUsers);
        app.get(baseRoute + "/get/map", this.getUserCoordinates);
    }

    protectedRoutes(app:express.Application, baseRoute:string) {
        app.put(baseRoute + "/update", this.updateUser);
        app.get(baseRoute + "/get/form", this.getUserForm);
    }

    getSingleUser(req:JwtRequest, res:express.Response) {

        User.findOne({$and: [{"_id": req.body.id}, {"active": true}]})
            .exec(done);

        function done(err:any, result:User) {
            if (err) {
                console.log("err");
                return
            }

            //don't give users email adress to client
            //todo: also for sensitive data
            result.email = null;

            res
                .status(200)
                .json(result);
        }
    }

    // this allows an authenticated user to get his own data, if he still is active
    getUserForm(req:JwtRequest, res:express.Response) {

        User.findOne()
            .where({"github_id": req.decoded.github_id})
            .exec(done);

        function done(err:any, result:User) {
            if (err) {
                console.log("err");
                return
            }

            res
                .status(200)
                .json(result);
        }
    }

    getUsers(req:express.Request, res:express.Response) {

        User
            .find({"active": true})
            .exec(done);

        function done(err:any, result:User) {
            if (err) {
                console.log("err");
                return
            }

            res
                .status(200)
                .json(result);
        }
    }

    getUserCoordinates(req:express.Request, res:express.Response) {
        var coordinates = [];

        User
            .find({"active": true})
            .exec(done);

        function done(err:any, result:User) {
            if (err) {
                console.log("err");
                return
            }

            _.forEach(result, function (user, key) {
                coordinates.push({
                    lat: user.latitude,
                    lng: user.longitude
                })
            });

            res
                .status(200)
                .json(coordinates);
        }
    }

    updateUser(req:JwtRequest, res:express.Response) {

        UserCtrl.getCoordinates(req.body.city)
            .then(function (result) {
                result = JSON.parse(result);

                User.findOneAndUpdate({
                    "github_id": req.decoded.github_id
                }, {
                    "name": req.body.name,
                    "website": req.body.website,
                    "twitter": req.body.twitter,
                    "description": req.body.description,
                    "city": req.body.city,
                    "zip": req.body.zip,
                    "tec": req.body.tec,
                    "active": true,
                    "longitude": result.results[0].geometry.location.lng,
                    "latitude": result.results[0].geometry.location.lat
                }, {
                    "new": true
                }, done);
            });

        function done(err:any, result:User) {
            if (err) {
                console.log("err");
                return;
            }

            res
                .status(200)
                .json("user data updated");
        }
    }

    static getCoordinates(location:string):any {
        return request.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(location))
    }


}

export default new UserCtrl();