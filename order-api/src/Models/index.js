import { Sequelize } from 'sequelize';
import stock from './stock.models.js'
import order from './order.models.js'


// config()

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
db.Stock = stock(sequelize);
db.Order = order(sequelize);

export default db;
