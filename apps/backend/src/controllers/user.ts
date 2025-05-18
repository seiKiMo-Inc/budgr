import Elysia from "elysia";

import type { UserData } from "@/types.ts";
import AuthController from "@controllers/auth.ts";

export default new Elysia({ prefix: "/user" })
    .use(AuthController)
    .get(
        "/",
        ({ user }) => {
            return {} satisfies UserData;
        },
        {
            auth: true
        }
    );
