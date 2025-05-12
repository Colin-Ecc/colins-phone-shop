import { MongoClient } from 'mongodb';

export const dynamic = "force-dynamic";

export async function POST(req) {
  const body = await req.json();
  console.log("Received checkout body:", body); 

  if (!body || body.length === 0) {
    return new Response(JSON.stringify({ error: 'Cart is empty' }), { status: 400 });
  }

  const client = new MongoClient(process.env.MONGODB);
  const dbName = 'myDatabase'; // replace with your DB name

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('orders');

    const result = await collection.insertOne({
      items: body,
      timestamp: new Date()
    });

    return Response.json({ message: 'Order saved', orderId: result.insertedId });
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save order' }), { status: 500 });
  } finally {
    await client.close();
  }
}
