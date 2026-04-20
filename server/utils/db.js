import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("Please set a MONGODB_URI on the ENV");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(MONGO_URI, options)
      .then((mongoose) => mongoose);
  }

  try{
    cached.conn = await cached.promise
  }catch(err){
    cached.promise = null
    throw err;
  }

  return cached.conn
}
