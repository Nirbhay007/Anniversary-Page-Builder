import { Inter, Playfair_Display, Lato, Fredoka, Quicksand, Press_Start_2P, VT323, Great_Vibes } from "next/font/google";
import "./globals.css";
import "./themes.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });

export const metadata = {
  title: "Wedding Anniversary - Create Magic",
  description: "Create a luxurious, cinematic wedding anniversary invitation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${lato.variable} ${fredoka.variable} ${quicksand.variable} ${pressStart.variable} ${vt323.variable} ${greatVibes.variable}`}>
        {children}
      </body>
    </html>
  );
}
