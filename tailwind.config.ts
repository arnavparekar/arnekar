import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ['"JetBrains Mono"', '"Fira Code"', '"Courier New"', "monospace"],
            },
            colors: {
                terminal: {
                    bg: "var(--bg)",
                    fg: "var(--fg)",
                    accent: "var(--accent)",
                    secondary: "var(--secondary)",
                },
            },
            animation: {
                blink: "blink 1s step-end infinite",
                scanline: "scanline 8s linear infinite",
            },
            keyframes: {
                blink: {
                    "0%, 49%": { opacity: "1" },
                    "50%, 100%": { opacity: "0" },
                },
                scanline: {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100%)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
