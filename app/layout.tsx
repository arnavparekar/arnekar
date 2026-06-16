import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Arnav Parekar | Terminal Portfolio",
    description:
        "Interactive terminal-themed portfolio of Arnav Parekar — Developer, Cybersecurity Enthusiast. Explore projects, skills, and experience through a retro CLI.",
    keywords: [
        "Arnav Parekar",
        "portfolio",
        "terminal",
        "developer",
        "cybersecurity",
        "Next.js",
        "React",
        "TypeScript",
    ],
    authors: [{ name: "Arnav Parekar" }],
    openGraph: {
        title: "Arnav Parekar | Terminal Portfolio",
        description:
            "Interactive terminal-themed portfolio — explore my work through a retro CLI experience.",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Arnav Parekar | Terminal Portfolio",
        description:
            "Interactive terminal-themed portfolio — explore my work through a retro CLI experience.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="espresso" suppressHydrationWarning>
            <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
