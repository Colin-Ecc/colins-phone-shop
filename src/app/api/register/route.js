export async function GET(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page")


  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')
  const dob = searchParams.get('dob')


  console.log(email);
  console.log(pass);
  console.log(dob);

 // =================================================
  const { MongoClient } = require('mongodb');
   const client = new MongoClient(process.env.MONGODB);
  
 
  const dbName = 'myDatabase'; // database name

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('login'); // collection name


  const findResult = await collection.insertOne({"username": email, "pass": pass, "dob": dob});
  console.log('Found documents =>', findResult);

 let valid=true;


 //==========================================================





  // at the end of the process we need to send something back.
  return Response.json({ "data":"" + valid + ""})
}

