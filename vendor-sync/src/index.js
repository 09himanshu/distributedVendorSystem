import db from './Model/index.js'
import { syncVendor } from './utils/syncVendor.js';
import vendors from './vendor.json' with { type: 'json' };

const syncAll = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log(vendors)
    
    for (const vendor of vendors) {
      await syncVendor(vendor);
    }

    await db.sequelize.close();
  } catch (err) {
    console.error('Sync failed:', err.message);
  }
};

syncAll();
