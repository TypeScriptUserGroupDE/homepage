import express = require("express");

export interface SearchRequest extends express.Request {
    city?:string;
    tec?:string[];
}