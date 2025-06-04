import Elysia, { t } from "elysia";

import AuthController from "@controllers/auth.ts";
import type { Profile } from "@models/Profile.ts";

export default new Elysia({ prefix: "/profile" })
    .use(AuthController)
    .guard({ auth: true })
    .get(
        "/",
        async ({ userData }) => {
            // Resolve the user's profile.
            const profile = await userData.populate<{ profile: Profile }>("profile");
            return { profile };
        }
    )
    .patch(
        "/",
        async ({ userData, body }) => {

        },
        {
            body: t.Object({})
        }
    );
