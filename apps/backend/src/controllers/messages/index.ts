import Elysia from "elysia";

import AuthController from "@controllers/auth.ts";

export default new Elysia({ prefix: "/messages" })
    .use(AuthController)
    .guard({ auth: true })
    .get(
        "/",
        ({ user }) => {
            return { name: user.name };
        }
    );
