import { $ } from "bun";
import { MongoMemoryReplSet } from "mongodb-memory-server";

// Create the in-memory database.
const instance = await MongoMemoryReplSet.create();
const uri = instance.getUri();

// Set the URI as an environment variable.
process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf("/")) + "/budgr";

// Push the schema to the database.
await $`bunx prisma db push --force-reset`
