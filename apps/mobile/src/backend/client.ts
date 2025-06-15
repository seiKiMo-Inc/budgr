import { treaty } from "@elysiajs/eden";

import type { App } from "@backend/index.ts";
import { authClient } from "@backend/auth.ts";

export default treaty<App>(
    process.env.EXPO_PUBLIC_BASE_URL ?? "http://localhost:3000",
    { headers: { cookie: authClient.getCookie() } }
);
