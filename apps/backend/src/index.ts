import cors from "@elysiajs/cors";
import Elysia from "elysia";

import mongoose from "mongoose";

import AuthController from "@controllers/auth.ts";
import UserController from "@controllers/user/index.ts";
import ConversationsController from "@controllers/conversations/index.ts";
import { newError } from "@controllers/utils.ts";

// Connect to MongoDB (for mongoose).
await mongoose.connect(
    process.env.MONGODB_URI ?? "mongodb://localhost:27017/budgr"
);

const app = new Elysia()
    .use(
        cors({
            origin: process.env.CORS_ORIGIN?.split(",") ?? "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"]
        })
    )
    .onError(({ code, error, set }) => {
        if (code == 401) {
            set.status = 401;
            return newError(401, "Unauthorized");
        }
        return newError(code, error.toString());
    })
    .use(AuthController)
    .use(UserController)
    .use(ConversationsController)
    .get("/health", () => "OK")
    .listen({ hostname: "0.0.0.0", port: process.env.OVERRIDE_PORT ?? 3000 });

export default app;

/** This export is used with '@elysiajs/eden'. */
export type App = typeof app;
