import { create } from "zustand";

export interface ColorStore {
    // Background & outline colors.
    bg: {
        primary: string;
        secondary: string;
    };
    accent: string;
    contrast: string;

    // Text colors.
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        placeholder: string;
        accent: string;
    };
    border: string;
}
const useColor = create<ColorStore>()(() => ({
    bg: {
        // primary: "#335C67",
        primary: "#E5F9E0",
        // secondary: "#5192A4",
        secondary: "#FFFFFF",
    },

    // accent: "#40C9A2",
    accent: "#335C67",
    contrast: "#5ED700",

    text: {
        primary: "#334155", // aligned to `bg.primary`; Slate/700
        secondary: "#09090b", // aligned to `bg.secondary`; Zinc/950
        tertiary: "#71717a", // aligned to `bg.secondary`; Zinc/500
        placeholder: "#74717A",
        accent: "#FFFFFF", // aligned to `accent`; White/900
    },
    border: "oklch(92% 0.004 286.32)"
}));

export default useColor;
