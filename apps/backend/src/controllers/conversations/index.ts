import Elysia, { t } from "elysia";

import UserController from "@controllers/auth.ts";

export default new Elysia({ prefix: "/conversations" })
    .use(UserController)
    .guard({ auth: true })
    .get(
        "/",
        async ({ user }) => {
            return { conversations: [] }
        },
        {
            response: t.Object({
                conversations: t.Array(t.Object({}))
            })
        }
    )
    .post(
        "/new",
        async ({ user, body, set }) => {
            set.status = 201;

            return {
                conversation: {}
            };
        },
        {
            body: t.Object({
                name: t.Optional(t.String()),
                users: t.Array(t.String())
            }),
            response: t.Object({
                conversation: t.Object({})
            })
        }
    );
