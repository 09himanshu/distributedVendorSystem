import db from './Model/index.js'
import { syncVendor } from './utils/syncVendor.js';
import vendors from './vendor.json' with { type: 'json' };

async function DbConnection() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({force: true});
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

await DbConnection()

const startSyncLoop = async () => {
  try {

    const syncAllVendors = async () => {
      console.log(vendors)
      for (const vendor of vendors) {
        await syncVendor(vendor);
      }
    };

    await syncAllVendors();

    // Run every 10 seconds
    setInterval(syncAllVendors, 10000);
  } catch (err) {
    console.error('Sync loop crashed:', err);
  }
};

startSyncLoop();