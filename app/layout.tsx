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

const SITE_URL = "https://xboxcemetery.com";
const DESCRIPTION =
  "A commemorative website, remembering the studios that made us gamers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Xbox Cemetery",
    template: "%s · Xbox Cemetery",
  },
  description: DESCRIPTION,
  applicationName: "Xbox Cemetery",
  keywords: [
    "Xbox",
    "Microsoft",
    "game studio closures",
    "studio shutdowns",
    "video game history",
    "game preservation",
    "Xbox Game Studios",
    "killed by Microsoft",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Xbox Cemetery",
    title: "Xbox Cemetery",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xbox Cemetery",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
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
        {/* Umami analytics — privacy-friendly, cookieless. */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="8a852981-d4f9-43d9-bef9-218c2c4e5b21"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
