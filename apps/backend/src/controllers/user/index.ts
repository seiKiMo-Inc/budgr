import Elysia from "elysia";

import AuthController from "@controllers/auth.ts";
import ReminderController from "@controllers/user/reminder.ts";

export default new Elysia({ prefix: "/user" })
    .use(AuthController)
    .guard({ auth: true })
    // TODO: Add more data to user endpoint.
    .get(
        "/@me",
        ({ user }) => user
    )
    .use(ReminderController);
