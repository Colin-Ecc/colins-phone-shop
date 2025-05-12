import { MongoClient, ObjectId } from 'mongodb';

// API route to delete an item from the cart by its MongoDB ObjectId
export async function POST(req) {
  // Parse the JSON body to get the item ID
  const { id } = await req.json();

  // Connect to MongoDB
  const client = new MongoClient(process.env.MONGODB);
  await client.connect();
  const db = client.db('myDatabase');
  const collection = db.collection('cart');

  // Delete the document with the matching _id
  const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

  // Return the result
  return Response.json({ deletedCount: deleteResult.deletedCount });
}
