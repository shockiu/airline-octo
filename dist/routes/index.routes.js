"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
// importtar controlador 
const express_1 = require("express");
const urls_1 = require("../utils/urls");
const flightController_1 = require("../controllers/flightController");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.get(urls_1.URLS.flightsIdPassengers, flightController_1.flightController);
