import type { UserData } from "@repo/shared";
import { authClient } from "@backend/auth.ts";

/**
 * This is the internal account data provided by `better-auth`.
 */
type AccountData = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
};

/**
 * The entire user data, including `budgr` data & `better-auth` data.
 */
export type User = UserData & {
    account: AccountData;
};

/**
 * 'useUser' is a hook to get the logged in user data.
 */
function useUser(): User | undefined {
    const { data } = authClient.useSession();

    // If the account isn't logged in, we can't return user data.
    if (!data?.user) {
        return undefined;
    }

    return {
        account: data.user
    };
}

export default useUser;
