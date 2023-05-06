
import { Sequelize } from 'sequelize';
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || '';
const db = new Sequelize(DATABASE_URL,{
    dialect: 'mysql',
    logging: false,
    port: 3306
});
export default db;