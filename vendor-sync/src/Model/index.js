import {Sequelize} from 'sequelize'
import Stock from './stock.model.js'

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: process.env.dialect,
  logging: process.env.logging === 'true' ? console.log : false,
  dialectOptions: {
    connectTimeout: process.env.connectTimeout,
  },
  pool: {
    max: Number(process.env.poolMax),
    min: Number(process.env.poolMin),
    acquire: Number(process.env.poolAcquire),
    idle: Number(process.env.poolIdle)
  }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.stock = Stock(sequelize)

export default db