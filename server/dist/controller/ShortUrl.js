"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = exports.deleteUrl = exports.editUrl = exports.addUrl = exports.getAllUrls = void 0;
const ShortUrl_1 = __importDefault(require("../model/ShortUrl"));
const shortid_1 = require("shortid");
const Validator_1 = require("validator.ts/Validator");
const getAllUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortUrls = yield ShortUrl_1.default.find();
    res.json({ shortUrls: shortUrls });
});
exports.getAllUrls = getAllUrls;
const addUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let validator = new Validator_1.Validator;
    const paramUrl = req.body.full;
    if (validator.isURL(paramUrl, { require_tld: true })) {
        const newUrl = yield ShortUrl_1.default.create({ full: req.body.full });
        res.json({ message: 'new Short url added', newUrl });
    }
    else {
        res.json({ message: 'url is not valid' });
    }
});
exports.addUrl = addUrl;
const editUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.params;
    try {
        const editedUrl = yield ShortUrl_1.default.findOneAndUpdate({ full: url }, { short: shortid_1.generate() }, { new: true });
        res.json(editedUrl);
    }
    catch (err) {
        res.json({ message: 'something go wrong ' + err });
    }
});
exports.editUrl = editUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.params;
    try {
        yield ShortUrl_1.default.findOneAndDelete({ full: url });
        res.json('removed success');
    }
    catch (err) {
        res.json('something go wrong ' + err);
    }
});
exports.deleteUrl = deleteUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shortUrl = yield ShortUrl_1.default.findOne({ short: req.params.url });
    if (shortUrl == null)
        return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.json(shortUrl.full);
});
exports.getUrl = getUrl;
