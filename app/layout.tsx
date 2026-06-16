import type { Metadata, Viewport } from "next";
import { Cinzel, Chakra_Petch } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xbox Cemetery",
  description:
    "In memoriam — a translucent green memorial for the game studios laid to rest by the green machine.",
};

// Tints the iOS/Safari browser chrome (top status bar, bottom toolbar) to
// match the memorial's dark green rather than a default light bar.
export const viewport: Viewport = {
  themeColor: "#0e2110",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${chakraPetch.variable}`}>
      <head>
        {/* Runs before first paint: if the boot intro was already shown this
            session, mark <html> so CSS can hide it immediately — no flash on
            reload. Key must match BOOT_KEY in Cemetery.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('xbox-cemetery:booted'))document.documentElement.setAttribute('data-intro-seen','')}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
