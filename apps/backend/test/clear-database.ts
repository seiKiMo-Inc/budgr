import { MongoClient } from "mongodb";

const client = new MongoClient(
    process.env.MONGODB_URI ?? "mongodb://localhost:27017/budgr-test"
);
const database = client.db();

// Clear the database.
if (!await database.dropDatabase()) {
    console.error("Failed to clear the database.");
    process.exit(1);
}
