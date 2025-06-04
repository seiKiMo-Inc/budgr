import cors from "@elysiajs/cors";
import Elysia from "elysia";

import AuthController from "@controllers/auth.ts";
import UserController from "@controllers/user/index.ts";

const app = new Elysia()
    .use(
        cors({
            origin: process.env.CORS_ORIGIN?.split(",") ?? "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"]
        })
    )
    .use(AuthController)
    .use(UserController)
    .get("/health", () => "OK")
    .listen({ hostname: "0.0.0.0", port: process.env.OVERRIDE_PORT ?? 3000 });

export default app;

/** This export is used with '@elysiajs/eden'. */
export type App = typeof app;
