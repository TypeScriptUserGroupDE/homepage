import express = require("express");
import jwt = require("jsonwebtoken");
import _ = require("lodash");
import {JwtRequest} from "./../common/interfaces/JwtRequest";
import request = require("request-promise");
import {model as UserModel} from "./../models/User";
import {User} from "./../models/User";
import Config from "../config/config";
import logger from "../common/logging";
import {model as CityModel, City} from "../models/City";
import CityCtrl from "./CityCtrl";
import {UserDistance} from "../common/interfaces/UserDistance";
import {UserListItem} from "../common/interfaces/UserListItem";

class UserCtrl {

    publicRoutes(app: express.Application, baseRoute: string) {
        app.post(baseRoute + "/get", this.getSingleUser);
        app.get(baseRoute + "/get/all", this.getUsers);
        app.get(baseRoute + "/get/map", this.getUserMap);
        app.post(baseRoute + "/get/near", this.getUsersNearCity);
    }

    protectedRoutes(app: express.Application, baseRoute: string) {
        app.get(baseRoute + "/get/form", this.getUserForm);
        app.post(baseRoute + "/send/mail", this.sendMessage);
        app.put(baseRoute + "/update", this.updateUser);
        app.delete(baseRoute + "/delete", this.deleteUser);
    }

    getSingleUser(req: JwtRequest, res: express.Response) {

        UserModel
        .findOne({"$and": [{"login": req.body.username}, {"active": true}]})
        .exec(done);

        function done(err: any, result: User) {
            if (err) {
                console.log("err");
                return
            }

            if (result) {
                result = UserCtrl.cleanSensitiveData(result);
            }

            res
            .status(200)
            .json(result);
        }
    }

    // this allows an authenticated user to get his own data, if he is active
    getUserForm(req: JwtRequest, res: express.Response) {

        UserModel
        .findOne()
        .where({"github_id": req.decoded.github_id})
        .exec(done);

        function done(err: any, result: User) {
            if (err) {
                console.log("err");
                return
            }

            res
            .status(200)
            .json(result.toJSON());
        }
    }

    // todo: merge getUsers and getUsersNearCity because of duplicate functionality
    getUsers(req: express.Request, res: express.Response) {
        let limit: number = 10;

        UserModel
        .find({"active": true}, 'name login avatar_url city tec availability')
        .sort({"fieldSum": -1})
        .lean()
        .exec(done);

        function done(err: any, result: any) {
            if (err) {
                console.log("err");
                return
            }

            _.forEach(result, function (data: User, key: number) {
                result[key]['forProjects'] = data.availability.forProjects;
                result[key]['greaterDistance'] = data.availability.greaterDistance;
                result[key]['nodejs'] = data.tec.nodejs;
                result[key]['angularjs'] = data.tec.angularjs;
                result[key]['angular2'] = data.tec.angular2;
                result[key]['ionic'] = data.tec.ionic;
                result[key]['nativescript'] = data.tec.nativescript;

                delete result[key].availability;
                // delete result[key].tec;
            });

            res
            .status(200)
            .json(result);
        }
    }

    getUserMap(req: express.Request, res: express.Response) {

        UserModel
        .find({"active": true})
        .exec(done);

        function done(err: any, result: User[]) {
            if (err) {
                console.log("err");
                return
            }

            let userMap = _(result).groupBy('zip').map(function (item: User[], id: string) {
                let count = _.countBy(item, 'zip');
                let obj = {};

                if (item[0].loc) {
                    obj = {
                        "count": count[id],
                        "lat": item[0].loc[1],
                        "lng": item[0].loc[0]
                    };
                } else {
                    logger.log("warn", "User has no location data set:" + item[0]);
                }

                return obj
            });

            res
            .status(200)
            .json(userMap);
        }
    }

    sendMessage(req: JwtRequest, res: express.Response) {
        let sender: User;

        UserModel
        .findOne()
        .where({"github_id": req.decoded.github_id, "active": true})
        .exec(done);

        function done(err: any, result: User) {
            if (err) {
                console.log("err");
                return
            }

            if (result) {
                sender = result;

                UserModel
                .findOne({"login": req.body.username})
                .exec(sendMail);
            } else {
                res
                .status(403)
                .json('sender not active');
            }

        }

        function sendMail(err: any, result: User): any {
            if (err) {
                console.log("err");
                return
            }
            if (result) {
                let headers = {
                    Authorization: 'Basic ' + new Buffer('api:' + Config.mailgun_api_key).toString("base64")
                };

                let payload = {
                    from: sender.name + ' <' + sender.email + '>',
                    to: result.email,
                    subject: 'Nachricht von ' + sender.name + ': "' + req.body.subject + '" via typescriptusers.de',
                    text: 'Hallo ' + result.name + ', \n\n' + sender.name + ' hat dir auf typescriptusers.de eine Nachricht gesendet: \n\n -- \n\n' + req.body.message + '\n\n -- \n\n'
                };

                request.post({
                    url: 'https://api.mailgun.net/v3/' + Config.mailgun_domain + '/messages',
                    headers: headers,
                    formData: payload
                }).then(function (data: any) {
                    res
                    .status(200)
                    .json("mail qeued");
                });
            } else {
                res
                .status(400)
                .json("user not found");
            }

        }
    }

    deleteUser(req: JwtRequest, res: express.Response) {
        UserModel
        .findOne()
        .where({"github_id": req.decoded.github_id})
        .remove()
        .exec(done);

        function done(err: any) {
            if (err) {
                console.log('err');
            }

            res
            .status(200)
            .json("user deleted")
        }

    }

    getUsersNearCity(req: express.Request, res: express.Response) {

        UserCtrl.cacheGeoLocation(req.body.coordinates, req.body.city, req.body.country)
        .then(() => {

            UserModel.geoNear({
                type: "Point",
                coordinates: req.body.coordinates
            }, {
                spherical: true,
                maxDistance: parseInt(req.body.distance),
            }).then((result: UserDistance[]) => {
                    let out: any = [];
                    _.forEach(result, (data: UserDistance) => {
                        let obj: UserListItem = {
                            dis: data.dis,
                            name: data.obj.name,
                            login: data.obj.login,
                            avatar_url: data.obj.avatar_url,
                            city: data.obj.city,
                            forProjects: data.obj.availability.forProjects,
                            greaterDistance: data.obj.availability.greaterDistance,
                            nodejs: data.obj.tec.nodejs,
                            angularjs: data.obj.tec.angularjs,
                            angular2: data.obj.tec.angular2,
                            ionic: data.obj.tec.ionic,
                            nativescript: data.obj.tec.nativescript,
                            tec: data.obj.tec
                        };
                        out.push(obj);
                    });

                    res
                    .status(200)
                    .json(out);
                }
            )
        });
    }

    updateUser(req: JwtRequest, res: express.Response) {
        let location = req.body.zip + ' ' + req.body.city;

        UserCtrl.getCoordinates(location)
        .then(function (result: any) {
            // save users city (w/o zip to cities collection
            UserCtrl.saveCityCoordinates(req.body.city);

            let fieldSum: number = _.size(req.body);

            // cannot update if unique values are present, see:
            // http://stackoverflow.com/questions/23119823/mongoerror-field-name-duplication-not-allowed-with-modifiers
            delete req.body._id;
            delete req.body.__v;
            delete req.body.updatedAt;
            delete req.body.createdAt;
            delete req.body.github_id;
            delete req.body.login;

            let data: User = req.body;
            data.loc = [];
            data.loc[0] = result.results[0].geometry.location.lng;
            data.loc[1] = result.results[0].geometry.location.lat;
            data.fieldSum = fieldSum;
            data.active = true;

            UserModel.findOneAndUpdate({
                "github_id": req.decoded.github_id
            }, data, {
                "new": true
            }, done);
        });

        function done(err: any, result: User) {
            if (err) {
                console.log('err');
                return;
            }

            res
            .status(200)
            .json("user data updated");
        }
    }

    static getCoordinates(location: string): any {
        return request.get('http://maps.googleapis.com/maps/api/geocode/json?language=de&region=de&address=' + encodeURIComponent(location))
        .then(function (result) {
            return JSON.parse(result);
        })
    }

    static saveCityCoordinates(city: string) {
        CityModel
        .findOne({"name_lowercase": city.toLowerCase()})
        .then(function (result: City) {
            if (!result) {
                UserCtrl.getCoordinates(city)
                .then((result: City) => {
                    let cityObj = CityCtrl.createCity(result, city);
                });
            }
        });
    };

    static cacheGeoLocation(coordinates: number[], city: string, country: string) {
        return CityModel
        .findOne({"name_lowercase": city.toLowerCase()})
        .then(function (result: City) {
            if (!result) {
                CityCtrl.createCityCache(coordinates, city, country);
            }
        });
    };

    static cleanSensitiveData(data: User) {
        data = JSON.parse(JSON.stringify(data));

        delete data.email;
        delete data.github_token;
        delete data.zip;

        return data
    }

    static cancel(res: express.Response) {
        res
        .status(401)
        .json({
            "status": 401,
            "message": "Something went wrong."
        });
        return;
    };
}

export default new UserCtrl();