// src/app/api/login/route.js
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass  = searchParams.get('pass');

  const client = new MongoClient(process.env.MONGODB);
  await client.connect();
  const db = client.db('myDatabase');
  const user = await db.collection('login').findOne({ username: email });

  // bad creds
  if (!user || user.pass !== pass) {
    await client.close();
    return NextResponse.json(
      { data: false },
      { status: 200 }
    );
  }

  // good creds → return role too
  const acc_type = user.acc_type;  // e.g. "manager" or "customer"
  await client.close();
  return NextResponse.json(
    { data: true, acc_type },
    { status: 200 }
  );
}
