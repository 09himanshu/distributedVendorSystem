import axios from 'axios';
import db from '../Model/index.js'

export const syncVendor = async (vendor) => {
  try {
    const { data } = await axios.get(vendor.url);
    console.log(data);
    
    for (const product of data) {
      await db.stock.upsert({
        vendor: vendor.name,
        product_id: product.id,
        product_name: product.name,
        quantity: product.quantity,
        updated_at: new Date()
      });
    }
    console.log(`Synced ${vendor.name}`);
  } catch (err) {
    console.error(`Failed to sync ${vendor.name}: ${err.message}`);
  }
};
