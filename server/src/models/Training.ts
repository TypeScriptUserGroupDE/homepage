import mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

var Schema = mongoose.Schema;


export interface Training extends mongoose.Document {
    _id: typeof mongoose.Schema.Types.ObjectId;
    owner: typeof Schema.Types.ObjectId;
    title: string;
    tec: string;
    desc: string;
    company: string;
    website: string;
    cta_link: string;
    events: [{
        [key: string]: any;
        address: string,
        houseNumber: number,
        city: string,
        zip: number,
        longitude: number,
        latitude: number,
        startDate: Date,
        endDate: Date,
    }],
}

export var TrainingSchema = new Schema(
    {
        owner: {type: Schema.Types.ObjectId, ref: 'User'},
        title: {type: String, unique: true},
        tec: String,
        desc: String,
        company: String,
        website: String,
        cta_link: String,
        events: [{
            address: String,
            houseNumber: Number,
            city: String,
            zip: Number,
            longitude: Number,
            latitude: Number,
            startDate: Date,
            endDate: Date,
        }],
    },
    {
        timestamps: true
    }
);

export var model = mongoose.model<Training>("Training", TrainingSchema);
