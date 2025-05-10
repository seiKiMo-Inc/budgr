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
    external: [
        // We remove these because they will be bundled
        // in the app.
        "react", "react-native",

        // 'rn-vector-icons' causes a lot of problems with the bundler.
        "react-native-vector-icons"
    ],
    dts: true,
    ...options
}));
