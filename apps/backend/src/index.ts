import Elysia from "elysia";

const app = new Elysia()
    .get("/health", () => "OK");

/** This export is used with '@elysiajs/eden'. */
export type App = typeof app;
