export async function GET(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")


  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')

  console.log(email);
  console.log(pass);

 // =================================================
  const { MongoClient } = require('mongodb');

  const client = new MongoClient(process.env.MONGODB);
  // mongodb://localhost:27017/
 
  // const dbName = 'app'; // docker database name
  const dbName = 'myDatabase'; // database name

  await client.connect().then(() => console.log('CONNECTED')).catch((err) => console.log(err));
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  console.log(db);
  // const collection = db.collection('login'); // docker collection name
  const collection = db.collection('login'); // collection name

  const findResult = await collection.find({"username": email}).toArray();

  let valid = false;
  console.log('SERVER');
  if(findResult.length > 0 ){
    console.log(findResult[0]);
    
      if (findResult[0].pass === pass) {
        console.log("login valid")
        valid = true;
      }
  } else {

    valid = false;
    console.log("login invalid")
    
  }


 //==========================================================





  // at the end of the process we need to send something back.
  return Response.json({ "data": valid })
}

