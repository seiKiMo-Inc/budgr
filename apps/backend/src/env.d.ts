declare module "bun" {
    interface Env {
        MONGODB_URI: string;
        CORS_ORIGIN: string;
    }
}
