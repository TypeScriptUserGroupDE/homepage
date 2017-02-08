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
import {DeleteWriteOpResultObject} from "mongodb";
import Config from "../config/config";
let multer = require('multer');
let fs = require('fs');

var upload = multer({dest: Config.upload_tmp_dir});
var destPath = Config.upload_dir;

class TrainingsCtrl {
    publicRoutes(app: express.Application, baseRoute: string) {
        app.post(baseRoute + '/get', this.getSingleTraining);
        app.get(baseRoute + '/get/all', this.getAllTrainings);
        app.get(baseRoute + "/get/map", this.getTrainingsMap);
        app.post(baseRoute + "/get/near", this.getTrainingsNearCity);
    }

    protectedRoutes(app: express.Application, baseRoute: string) {
        app.put(baseRoute + '/create', upload.single('training_image'), this.createTraining);
        app.put(baseRoute + '/update', upload.single('training_image'), this.updateTraining);
        app.delete(baseRoute + "/delete", this.deleteTraining);
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

    createTraining(req: JwtRequest, res: express.Response) {
        req.body.events = JSON.parse(req.body.events);
        req.body.owner = req.decoded.userid;
        req.body.title_link = req.body.title.replace(/[^A-Z0-9]/ig, "-").toLowerCase();

        let fileExtension;
        if (req.file) {
            fileExtension = req.file.originalname.substr((~-req.file.originalname.lastIndexOf(".") >>> 0) + 2);
            req.body.imageFileName = req.body.title_link + '.' + fileExtension;
        }

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

                if (req.file) {
                    fs.renameSync(req.file.path, destPath + '/' + training.title_link + '.' + fileExtension);
                }
                res
                .status(200)
                .json(training);
            }
        );
    }

    updateTraining(req: JwtRequest, res: express.Response) {
        console.log(req.body);
        let data: Training = req.body;
        data.events = JSON.parse(req.body.events);
        req.body.title_link = req.body.title.replace(/[^A-Z0-9]/ig, "-").toLowerCase();

        let fileExtension;
        if (req.file) {
            fileExtension = req.file.originalname.substr((~-req.file.originalname.lastIndexOf(".") >>> 0) + 2);
            req.body.imageFileName = req.body.title_link + '.' + fileExtension;
        }

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

            if (req.file) {
                fs.renameSync(req.file.path, destPath + '/' + result.title_link + '.' + fileExtension);
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