import Elysia from "elysia";

import { auth } from "@lib/auth.ts";

export default new Elysia({ name: "Services.Auth" })
    .mount(auth.handler)
    .macro({
        auth: {
            async resolve({ status, request: { headers } }) {
                const session = await auth.api.getSession({ headers });

                // If no session is found, return a 401 status.
                if (!session) {
                    return status(401);
                }

                // Return the user data.
                return { user: session.user, session: session.session };
            }
        }
    });
