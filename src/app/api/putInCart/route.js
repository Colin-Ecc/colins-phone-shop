export async function POST(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the putInCart api page")


  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const { pname, price } = await req.json(); 

  console.log(pname);

 // =================================================
  const { MongoClient } = require('mongodb');

  const client = new MongoClient(process.env.MONGODB);
  
 
  const dbName = 'myDatabase'; // database name

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('cart'); // collection name


  var myobj = { pname: pname, price: price };
  const insertResult = await collection.insertOne(myobj);


 //==========================================================





  // at the end of the process we need to send something back.
  return Response.json({ "data":"" + "inserted" + insertResult})
}

