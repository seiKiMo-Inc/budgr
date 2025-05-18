import Elysia from "elysia";

import { auth } from "@lib/auth.ts";

export default new Elysia({ name: "Services.Auth", prefix: "/auth" })
    .mount(auth.handler)
    .macro({
        auth: {
            async resolve({ status, request: { headers } }) {
                const session = await auth.api.getSession({ headers });

                if (session) {
                    return { user: session.user, session: session.session };
                }
                return status(401);
            }
        }
    });
