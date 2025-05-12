// src/app/api/orders/route.js
import { MongoClient } from 'mongodb';

export async function GET(request) {
  const client = new MongoClient(process.env.MONGODB);
  try {
    await client.connect();
    const db = client.db('myDatabase');
    const orders = await db
      .collection('orders')
      .find({})
      .toArray();

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('GET /api/orders error:', err);
    return new Response(
      JSON.stringify({ error: 'Unable to fetch orders' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await client.close();
  }
}
