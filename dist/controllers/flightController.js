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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightController = void 0;
const flightsService_1 = require("../services/flightsService");
const urls_1 = require("../utils/urls");
const response_1 = require("../utils/response");
const express_1 = require("express");
exports.flightController = (0, express_1.Router)();
const flightsService = new flightsService_1.FlightService();
exports.flightController.get(urls_1.URLS.flightsIdPassengers, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    flightsService.findFlightsById(req.params.id)
        .then((response) => {
        const _a = (0, response_1.responseService)((0, response_1.STATUS)('success'), response), { errors } = _a, rest = __rest(_a, ["errors"]);
        res.status(rest.code).send(rest);
    })
        .catch((err) => {
        if (err.message && err.resposneDb) {
            const _a = (0, response_1.responseService)((0, response_1.STATUS)(err.message), err.resposneDb), { errors } = _a, rest = __rest(_a, ["errors"]);
            res.status(rest.code).send(rest);
        }
        else {
            const _b = (0, response_1.responseService)((0, response_1.STATUS)(null), null, (0, response_1.MESSAGES)(null)), { data } = _b, rest = __rest(_b, ["data"]);
            res.status(rest.code).send(rest);
        }
    });
}));
