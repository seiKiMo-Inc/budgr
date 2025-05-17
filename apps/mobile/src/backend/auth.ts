import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";

import * as SecureStorage from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: `${process.env.EXPO_PUBLIC_BASE_URL}${process.env.EXPO_PUBLIC_AUTH_PATH}`,
    plugins: [
        expoClient({
            scheme: "budgr",
            storagePrefix: "budgr",
            storage: SecureStorage
        })
    ]
});
