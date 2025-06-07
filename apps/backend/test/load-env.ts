// Workaround taken from:
// https://github.com/oven-sh/bun/issues/6334

import { config } from "dotenv";

// Load .env.test file
const { parsed, error } = config({ path: ".env.test" });

// Throw error if .env.test file is not found.
// It will log an error message, but it WILL NOT fail the test.
if (error) throw error;

// Update the env. We're lucky process.env is mutable.
process.env = { ...process.env, ...parsed };
console.info("Loaded environment variables from .env.test");
