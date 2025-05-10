import Elysia from "elysia";

const app = new Elysia()
    .get("/health", () => "OK")
    .listen({ hostname: "0.0.0.0", port: 3000 });

export default app;

/** This export is used with '@elysiajs/eden'. */
export type App = typeof app;
