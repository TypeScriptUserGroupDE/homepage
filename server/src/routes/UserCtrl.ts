import express = require("express");
import jwt = require("jsonwebtoken");
import _ = require("lodash/index");
import {JwtRequest} from "./../common/interfaces/JwtRequest";
import {SearchRequest} from "./../common/interfaces/SearchRequest";
import request = require("request-promise");
import {model as UserModel} from "./../models/User";
import {User} from "./../models/User";
import Config from "../config/config";

class UserCtrl {

    publicRoutes(app: express.Application, baseRoute: string) {
        app.post(baseRoute + "/get", this.getSingleUser);
        app.get(baseRoute + "/get/all", this.getUsers);
        app.get(baseRoute + "/get/map", this.getUserMap);
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

    getUsers(req: express.Request, res: express.Response) {
        let limit: number = 10;

        UserModel
            .find({"active": true}, 'name login avatar_url city tec')
            .sort({"fieldSum": -1})
            .lean()
            .exec(done);

        function done(err: any, result: User[]) {
            if (err) {
                console.log("err");
                return
            }

            _.forEach(result, function (data: User, key: number) {
                result[key] = (UserCtrl.cleanSensitiveData(data));
            });


            res
                .status(200)
                .json(result);
        }
    }

    // searchByCity(req: SearchRequest, res: express.Response) {
    //     req.body.tec = req.body.tec || [];
    //
    //     UserModel
    //         .find({
    //             "$or": [
    //                 {
    //                     "$and": [
    //                         {"active": true},
    //                         {"city": new RegExp("^" + req.body.city + "$", "i")}
    //                     ]
    //                 },
    //                 {
    //                     "$and": [
    //                         {"active": true},
    //                         {"tec": req.body.tec}
    //                     ]
    //                 }
    //             ]
    //         })
    //         .sort({"fieldSum": -1})
    //         .exec(done);
    //
    //     function done(err: any, result: User[]) {
    //         if (err) {
    //             console.log("err");
    //             return
    //         }
    //
    //         res
    //             .status(200)
    //             .json(result);
    //     }
    // }

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
                obj = {
                    "count": count[id],
                    "lat": item[0].latitude,
                    "lng": item[0].longitude
                };
                return obj
            });

            res
                .status(200)
                .json(userMap);
        }
    }

    sendMessage(req: JwtRequest, res: express.Response) {

        UserModel
            .findOne({"login": req.body.username})
            .exec(done);

        function done(err: any, result: User): any {
            if (err) {
                console.log("err");
                return
            }
            if (result) {
                let headers = {
                    Authorization: 'Basic ' + new Buffer('api:' + Config.mailgun_api_key).toString("base64")
                };

                let payload = {
                    from: Config.mailgun_sender_email,
                    //todo: override to not spam anyone
                    // to: 'strauss@w11k.de',
                    to: result.email,
                    subject: req.body.subject,
                    text: req.body.message
                };

                request.post({
                    url: 'https://api.mailgun.net/v3/' + Config.mailgun_domain + '/messages',
                    headers: headers,
                    formData: payload
                })
                    .then(function (data: any) {
                        res
                            .status(200)
                            .json("mail qeued");
                    });
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


    updateUser(req: JwtRequest, res: express.Response) {

        let location = req.body.zip + ' ' + req.body.city;

        UserCtrl.getCoordinates(location)

            .then(function (result: any) {
                result = JSON.parse(result);

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
                data.longitude = result.results[0].geometry.location.lng;
                data.latitude = result.results[0].geometry.location.lat;
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

    static
    getCoordinates(location: string): any {
        return request.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(location))
    }

    static
    cleanSensitiveData(data: User) {
        data = JSON.parse(JSON.stringify(data));

        delete data.email;
        delete data.github_token;
        delete data.zip;

        return data
    }


}

export default new UserCtrl();