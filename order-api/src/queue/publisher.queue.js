import amqp from 'amqplib';

export const publishOrder = async (order) => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  const queue = process.env.queueName

  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)), {
    persistent: true
  });

  await channel.close();
  await conn.close();
};
