import { MongoClient, ServerApiVersion, Db } from 'mongodb';

// Use environment variables for credentials and database name
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;
const DATABASE_NAME = import.meta.env.VITE_DATABASE_NAME;

if (!MONGODB_URI) {
  throw new Error("VITE_MONGODB_URI is not set in your environment variables.");
}
if (!DATABASE_NAME) {
  throw new Error("VITE_DATABASE_NAME is not set in your environment variables.");
}

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    db = client.db(DATABASE_NAME);
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  try {
    await client.close();
    db = null;
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error closing database connection:", error);
    throw error;
  }
}

export function getDatabase(): Db | null {
  return db;
}

export async function testConnection(): Promise<boolean> {
  try {
    const database = await connectToDatabase();
    await database.command({ ping: 1 });
    console.log("Database connection test successful!");
    return true;
  } catch (error) {
    console.error("Database connection test failed:", error);
    return false;
  }
}