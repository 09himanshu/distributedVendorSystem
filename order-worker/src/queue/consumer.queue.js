import amqp from 'amqplib';
import db from '../Models/index.models.js';

export const startWorker = async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  const queue = process.env.queueName

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    const content = JSON.parse(msg.content.toString());
    console.log(`Processing order:`, content);

    try {
      const order = await db.Order.findByPk(content.id);
      if (!order) return 'Order not found'
        // throw new Error('Order not found');

      // Simulate vendor success
      const success = Math.random() > 0.2;

      await order.update({
        status: success ? 'processed' : 'failed'
      });

      console.log(`Order #${order.id} marked as ${order.status}`);

      channel.ack(msg);

    } catch (err) {
      console.error(`Order processing failed:`, err.message);
      channel.nack(msg, false, true);
    }
  });

  console.log('Worker listening for orders...');
};
