import mongoose from "mongoose";

// Define the shape of the global mongoose cache
type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object
declare global {
  var mongoose: MongooseConnection | undefined;
}

// Reuse cached connection across hot reloads in development
let cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

// Get MongoDB URI from environment
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in your .env.local file");
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!)
      .then((mongooseInstance) => {
        console.log("✅ Connected to MongoDB");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ Failed to connect to MongoDB:", error);
        throw error; // Rethrow so it can be handled upstream
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset cache on failure
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
