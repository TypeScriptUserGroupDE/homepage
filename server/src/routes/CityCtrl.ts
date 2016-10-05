import express = require("express");
import jwt = require("jsonwebtoken");
import _ = require("lodash");
import request = require("request-promise");
import {model as CityModel, City} from "../models/City";

class CityCtrl {
    publicRoutes(app: express.Application, baseRoute: string) {
        app.get(baseRoute + "/get", this.getCityList);
    }

    getCityList(req: express.Request, res: express.Response) {
        CityModel
            .find({}, {'_id': 0, "name": 1})
            .exec(done);

        function done(error:any, result:City[]) {
            if (error) {
                console.log("err");
                return
            }

            let out:string[] = [];
            _.forEach(result, function (item) {
                out.push(item.name);
            });

            res
                .status(200)
                .json(out);
        }
    }

    createCity(data: any) {
        data = JSON.parse(data);
        let obj = {
            name: data.results[0].address_components[1].long_name,
            name_lowercase: data.results[0].address_components[1].long_name.toLowerCase(),
            country: data.results[0].address_components[data.results[0].address_components.length - 1].long_name,
            loc: [
                data.results[0].geometry.location.lng,
                data.results[0].geometry.location.lat
            ]
        };

        let city = new CityModel(obj);
        city.save(done);

        var done = (err: any) => {
            if (err) {
                console.log('err');
                return;
            }
        };
        return city
    }

}

export default new CityCtrl();