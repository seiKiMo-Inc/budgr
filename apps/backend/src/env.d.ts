declare module "bun" {
    interface Env {
        OVERRIDE_PORT?: number;

        MONGODB_URI: string;
        CORS_ORIGIN: string;

        /* Social providers. */
        DISCORD_CLIENT_ID: string;
        DISCORD_CLIENT_SECRET: string;
    }
}
