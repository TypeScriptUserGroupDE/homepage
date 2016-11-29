import express = require('express');
import jwt = require('jsonwebtoken');
import _ = require('lodash');
import {JwtRequest} from './../common/interfaces/JwtRequest';
import request = require('request-promise');
import {model as UserModel} from './../models/User';
import {User} from './../models/User';
import {Training} from './../models/Training';
import {model as TrainingModel} from './../models/Training';

class TrainingsCtrl {

    publicRoutes(app: express.Application, baseRoute: string) {
        app.post(baseRoute + '/get', this.getSingleTraining);
        app.get(baseRoute + '/get/all', this.getAllTrainings);
    }

    protectedRoutes(app: express.Application, baseRoute: string) {
        app.post(baseRoute + '/create', this.createTraining);
        app.put(baseRoute + '/update', this.updateTraining);
    }

    createTraining(req: JwtRequest, res: express.Response) {
        console.log(req.body);
        let training = new TrainingModel(req.body);
        training.save(
            function (err) {
                if (err) {
                    console.log('err');
                    res.status(500);
                    res.send('500 - Internal Error');
                    return;
                }

                res
                    .status(200)
                    .json('training created');
            }
        );
    }

    updateTraining(req: JwtRequest, res: express.Response) {
        let data: Training = req.body;

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
                .json("training data updated");
        }
    }

    getSingleTraining(req: JwtRequest, res: express.Response) {

        TrainingModel
            .findOne({'_id': req.params.id})
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

}

export default new TrainingsCtrl();