import Elysia from "elysia";

const app = new Elysia()
    .get("/health", () => "OK")
    .listen(3000, listenCallback);

function listenCallback(): void {
    console.log("🔥 Web server is running on http://localhost:3000");
}

export default app;

/** This export is used with '@elysiajs/eden'. */
export type App = typeof app;
