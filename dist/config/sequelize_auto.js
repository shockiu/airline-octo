"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_auto_1 = __importDefault(require("sequelize-auto"));
const auto = new sequelize_auto_1.default('database', 'user', 'pass', {
    host: 'host',
    dialect: 'mysql',
    directory: './src/models',
    port: 3306,
    caseModel: 'c',
    caseFile: 'c',
    singularize: true,
    lang: 'ts',
    additional: {},
    tables: [
        'airplane',
        'boarding_pass',
        'flight',
        'passenger',
        'purchase',
        'seat',
        'seat_type'
    ],
    useDefine: true
});
auto.run().then(data => {
    console.log(data.tables); // table and field list
    console.log(data.foreignKeys); // table foreign key list
    console.log(data.indexes); // table indexes
    console.log(data.hasTriggerTables); // tables that have triggers
    console.log(data.relations); // relationships between models
    console.log(data.text); // text of generated models
});
