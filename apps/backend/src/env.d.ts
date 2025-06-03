declare module "bun" {
    interface Env {
        MONGODB_URI: string;
        CORS_ORIGIN: string;

        /* Social providers. */
        DISCORD_CLIENT_ID: string;
        DISCORD_CLIENT_SECRET: string;
    }
}
