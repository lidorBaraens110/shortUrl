"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import pkg from 'mongoose';
const shortid_1 = require("shortid");
const mongoose_1 = require("mongoose");
const shortUrlSchema = new mongoose_1.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortid_1.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.model('ShortUrl', shortUrlSchema);
