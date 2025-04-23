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

  const url = 'mongodb://newAdmin:pass@localhost:27017/';
  const client = new MongoClient(url);
  // mongodb://localhost:27017/
 
  // const dbName = 'app'; // docker database name
  const dbName = 'myDatabase'; // database name

  await client.connect().then((message) => {
    console.log(message)
  })
  .catch((err) => console.log(err));
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  console.log(db);
  // const collection = db.collection('login'); // docker collection name
  const collection = db.collection('users'); // collection name

  const findResult = await collection.find({"username": "sample@test.com"}).toArray();
  console.log('Found documents =>', findResult);

  let valid = false
  if(findResult.length > 0 ){
      valid = true;
      console.log("login valid")
  } else {

    valid = false;
    console.log("login invalid")
  }


 //==========================================================





  // at the end of the process we need to send something back.
  return Response.json({ "data":"" + valid + ""})
}

