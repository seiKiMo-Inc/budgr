import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    entry: {
        index: "src/index.tsx"
    },
    banner: {
        js: "'use client'"
    },
    loader: {
        ".js": "jsx"
    },
    clean: true,
    format: ["cjs", "esm"],
    external: ["react"],
    dts: true,
    ...options
}));
