import mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

var Schema = mongoose.Schema;

export interface City extends mongoose.Document {
    _id: typeof mongoose.Schema.Types.ObjectId;
    name: string;
    name_lowercase: string;
    county: string;
    loc: number[];
}

export var CitySchema = new Schema(
    {
        name: {type: String, unique: true},
        name_lowercase: {type: String, unique: true},
        country: String,
        loc: {
            type: [Number], // [0]: longitude, [1]: latitude
            index: '2dsphere'
        },
    },
    {
        timestamps: true
    }
);

export var model = mongoose.model<City>("City", CitySchema);
