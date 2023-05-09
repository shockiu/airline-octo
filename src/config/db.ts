
import { Sequelize } from 'sequelize';
require('dotenv').config();

const DATABASE = process.env.DATABASE || '';
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || '';

export const db = new Sequelize(DATABASE, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    dialect: 'mysql',
    port: 3306
});
