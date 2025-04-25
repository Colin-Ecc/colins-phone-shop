import { MongoClient } from 'mongodb';

export async function GET(req) {
  console.log("in the getCart API");

  const client = new MongoClient(process.env.MONGODB);

  try {
    await client.connect();
    const db = client.db('myDatabase');
    const collection = db.collection('cart');

    const cartItems = await collection.find({}).toArray();
    console.log('Cart Items:', cartItems);

    return new Response(JSON.stringify(cartItems), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in getCart:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
