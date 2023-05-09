"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
const DATABASE = process.env.DATABASE || '';
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || '';
exports.db = new sequelize_1.Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: 3306
});
