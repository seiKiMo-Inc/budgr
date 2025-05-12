import Elysia from "elysia";
import cors from "@elysiajs/cors";

import AuthController from "@controllers/auth.ts";

const app = new Elysia()
    .use(
        cors({
            origin: process.env.CORS_ORIGIN?.split(",") ?? "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"]
        })
    )
    .get("/health", () => "OK")
    .use(AuthController)
    .listen({ hostname: "0.0.0.0", port: 3000 });

export default app;

/** This export is used with '@elysiajs/eden'. */
export type App = typeof app;
