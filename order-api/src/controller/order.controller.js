import * as Error from '../utils/error.utils.js'
import db from '../Models/index.js'
import { publishOrder } from '../queue/publisher.queue.js'

export const order = async (req, res, next) => {
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity || quantity <= 0) {
    return next(new Error.BadRequestError('Invalid product_id or quantity'))
  }

  try {
    const result = await db.sequelize.transaction(async (t) => {
      const stock = await db.Stock.findOne({
        where: { product_id },
        transaction: t,
        lock: true
      });

      if (!stock || stock.quantity < quantity) {
        return next(new Error.BadRequestError('Insufficient stock'))
      }

      // Decrement stock - try this approach
      await stock.update(
        { quantity: stock.quantity - quantity },
        { transaction: t }
      );

      // Create order with status
      const order = await db.Order.create({
        product_id,
        quantity,
        status: 'pending'
      }, { transaction: t });


      return order;
    });

    await publishOrder({ 
      id: result.id, 
      product_id, 
      quantity 
    });

    return res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.log('Transaction error:', err);
    if (err instanceof Error.BadRequestError) {
      return next(err);
    }
    return next(new Error.InternalServerError('Something went wrong'))
  }
}