import type { Metadata } from "next";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${chakraPetch.variable}`}>
      <body>{children}</body>
    </html>
  );
}
