import { create } from "zustand";

export interface ColorStore {
    // Background & outline colors.
    primary: string;
    secondary: string;
    accent: string;
    contrast: string;

    // Text colors.
    text: string;
    placeholder: string;
}
const useColor = create<ColorStore>()(() => ({
    primary: "#000000",
    secondary: "#FFFFFF",
    accent: "#57AADD",
    contrast: "#FFFFFF",

    text: "#000000",
    placeholder: "#A0A0A0",
}));

export default useColor;
