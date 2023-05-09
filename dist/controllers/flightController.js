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
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightController = void 0;
const flightsService_1 = require("../services/flightsService");
const urls_1 = require("../utils/urls");
const express_1 = require("express");
exports.flightController = (0, express_1.Router)();
const flightsService = new flightsService_1.FlightService();
exports.flightController.get(urls_1.URLS.flightsIdPassengers, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    flightsService.findFlightsById(req.params.id)
        .then((response) => {
        res.send(response);
    })
        .catch((err) => {
        res.send(err);
    });
}));
