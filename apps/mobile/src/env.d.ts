declare module "NodeJS" {
    interface ProcessEnv {
        EXPO_PUBLIC_BASE_URL: string;
        EXPO_PUBLIC_AUTH_PATH: string;
    }
}
