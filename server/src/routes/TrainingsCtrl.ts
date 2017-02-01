import express = require('express');
import jwt = require('jsonwebtoken');
import _ = require('lodash');
import {JwtRequest} from './../common/interfaces/JwtRequest';
import request = require('request-promise');
import {model as UserModel} from './../models/User';
import {Training} from './../models/Training';
import {model as TrainingModel} from './../models/Training';
import UserCtrl  from "./UserCtrl";
import {UserDistance} from "../common/interfaces/UserDistance";
import {model as CityModel, City} from "../models/City";
import CityCtrl from "./CityCtrl";
import logger from "../common/logging";
import {Mongoose} from "mongoose";
import {DeleteWriteOpResultObject} from "mongodb";
let multer = require('multer');
let fs = require('fs');

var upload = multer({dest: "./user_upload/"});

class TrainingsCtrl {
    publicRoutes(app: express.Application, baseRoute: string) {
        app.post(baseRoute + '/get', this.getSingleTraining);
        app.get(baseRoute + '/get/all', this.getAllTrainings);
        app.get(baseRoute + "/get/map", this.getTrainingsMap);
        app.post(baseRoute + "/get/near", this.getTrainingsNearCity);
    }

    protectedRoutes(app: express.Application, baseRoute: string) {
        app.post(baseRoute + '/create', this.createTraining);
        app.put(baseRoute + '/update', upload.single('training_image'), this.updateTraining);
        app.delete(baseRoute + "/delete", this.deleteTraining);
    }

    createTraining(req: JwtRequest, res: express.Response) {
        req.body.owner = req.decoded.userid;
        req.body.title_link = req.body.title.replace(/[^A-Z0-9]/ig, "-").toLowerCase();

        let training = new TrainingModel(req.body);

        _.forEach(training.events, (item) => {
            TrainingsCtrl.saveCityCoordinates(item.city);
        });

        training.save(function (err) {
                if (err) {
                    if (err.code = 11000) {
                        res.status(409);
                        res.send('409 - Conflict');
                        throw err;
                    } else {
                        res.status(500);
                        res.send('500 - Internal Error');
                        throw err;
                    }

                }

                res
                .status(200)
                .json(training);
            }
        );
    }

    deleteTraining(req: JwtRequest, res: express.Response) {

        TrainingModel
        .findOne({$and: [{'_id': req.body.id}, {owner: req.decoded.userid}]})
        .remove() // populate corresponding user using field owner, only select name and login fields
        .exec(done);

        function done(err: any, result: DeleteWriteOpResultObject) {
            if (err) {
                console.log('err');
                return
            } else if (result.result.ok === 1) {
                res
                .status(200)
                .json("training deleted")
            } else {
                TrainingsCtrl.cancel(res)
            }
        }
    }

    updateTraining(req: JwtRequest, res: express.Response) {
        console.log(req.file);
        console.log(req.files);
        console.log(req.body);

        req.body.title_link = req.body.title.replace(/[^A-Z0-9]/ig, "-").toLowerCase();
        let data: Training = req.body;

        _.forEach(data.events, (item) => {
            TrainingsCtrl.saveCityCoordinates(item.city);
        });

        TrainingModel.findOneAndUpdate({
            "_id": req.body._id
        }, data, {
            "new": true
        }, done);

        function done(err: any, result: Training) {
            if (err) {
                console.log('err');
                return;
            }

            res
            .status(200)
            .json(result);
        }
    }

    getSingleTraining(req: JwtRequest, res: express.Response) {
        TrainingModel
        .findOne({'title_link': req.body.title_link})
        .populate('owner', 'name login') // populate corresponding user using field owner, only select name and login fields
        .exec(done);

        function done(err: any, result: Training) {
            if (err) {
                console.log('err');
                return
            }

            res
            .status(200)
            .json(result);
        }
    }

    getAllTrainings(req: JwtRequest, res: express.Response) {
        TrainingModel
        .find()
        .populate('owner', 'name login title_link') // populate corresponding user using field owner, only select name and login fields
        .sort({"title_link": 1})
        .exec(done);

        function done(err: any, result: Training) {
            if (err) {
                console.log('err');
                return
            }

            res
            .status(200)
            .json(result);
        }
    }

    getTrainingsMap(req: express.Request, res: express.Response) {
        TrainingModel
        .find()
        .exec(done);

        function done(err: any, result: Training[]) {
            if (err) {
                console.log("err");
                return
            }

            let trainingsMap = [];
            _.forEach(result, (item: Training, id: string) => {
                _.forEach(item.events, (event) => {
                    trainingsMap.push({
                        'title': item.title,
                        'title_link': item.title_link,
                        'company': item.company,
                        'tec': item.tec,
                        'lat': event.loc[1],
                        'lng': event.loc[0],
                        'city': event.city
                    });
                });
            });
            res
            .status(200)
            .json(trainingsMap);
        }
    }


    getTrainingsNearCity(req: express.Request, res: express.Response) {

        TrainingsCtrl.cacheGeoLocation(req.body.coordinates, req.body.city, req.body.country)
        .then(() => {
                TrainingModel.geoNear({
                    type: "Point",
                    coordinates: req.body.coordinates
                }, {
                    spherical: true,
                    distanceField: "dist",
                    maxDistance: parseInt(req.body.distance),
                }).then((result: UserDistance[]) => {
                        let out: any = [];
                        _.forEach(result, function (data: any) {
                            let obj = data.obj.toJSON();
                            obj.dis = data.dis;
                            out.push(obj);
                        });

                        res
                        .status(200)
                        .json(out);
                    }
                );
            }
        );
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
            if (result === null) {
                TrainingsCtrl.getCoordinates(city)
                .then((result: City) => {
                    let cityObj = CityCtrl.createCity(result, city);
                });
            }
        });
    };


    static cacheGeoLocation(coordinates: number[], city: string, country: string) {
        return CityModel.findOne({"name_lowercase": city.toLowerCase()})
        .then(function (result: City) {
            if (!result) {
                CityCtrl.createCityCache(coordinates, city, country);
            }
        });
    };

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

export default new TrainingsCtrl();