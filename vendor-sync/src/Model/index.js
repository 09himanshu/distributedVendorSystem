import {Sequelize} from 'sequelize'
import Stock from './stock.model.js'

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   logging: false,
// });

const sequelize = new Sequelize('postgres://postgres:password@postgres:5432/orders_db', {
  dialect: 'postgres',
  logging: false,
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.stock = Stock(sequelize)

async function testDbConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // You might want to exit the process or handle the error gracefully here
    process.exit(1); // Exit the application if connection fails
  }
}

// Call the function to test the connection when your application starts
await testDbConnection();

export default db