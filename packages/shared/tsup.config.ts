import { defineConfig } from "tsup";

export default defineConfig(options => ({
    entry: {
        index: "src/index.ts"
    },
    banner: {
        js: "'use client'"
    },
    loader: {
        ".js": "jsx"
    },
    clean: true,
    format: ["cjs", "esm"],
    dts: true,
    ...options
}));
