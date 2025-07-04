import axios from 'axios';
import db from '../Model/index.js';

export const syncVendor = async (vendor) => {
  try {
    console.log(vendor.containerUrl)

    const { data } = await axios.get(vendor.containerUrl);

    for (const product of data.data) {
      const existing = await db.stock.findOne({
        where: {
          vendor: vendor.name,
          product_id: product.id
        }
      });

      if (!existing) {
        await db.stock.create({
          vendor: vendor.name,
          product_id: product.id,
          product_name: product.name,
          quantity: product.quantity,
          updated_at: new Date()
        });
      } else { 
        await db.stock.increment(
          { quantity: product.quantity },
          {
            where: {
              vendor: vendor.name,
              product_id: product.id
            }
          }
        );
        await existing.update({ updated_at: new Date() });
      }
    }

    console.log(`Incrementally synced ${vendor.name}`);
  } catch (err) {
    console.error(`Failed syncing ${vendor.name}: ${err.message}`);
  }
};
