export const dynamic = "force-dynamic";

export async function GET(req, res) {

    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")

  
    // =================================================
    const { MongoClient } = require('mongodb');
  
   ///const url = 'mongodb://root:example@localhost:27017/';
   
   const client = new MongoClient(process.env.MONGODB);
    
   
    const dbName = 'myDatabase'; // database name
  
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('products'); // collection name
  
  
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
  
    
  
   //==========================================================
  
  
  
  
  
    // at the end of the process we need to send something back.
    return Response.json(findResult)
  }
  
  