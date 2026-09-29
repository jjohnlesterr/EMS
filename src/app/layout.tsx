import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NOVA PRO X — The Next-Gen Quantum AI Flagship Smartphone",
  description: "Experience 200MP Quad-Camera array, Snapdragon 8 Gen 4 Extreme, 165Hz Curved AMOLED, and 120W HyperCharge.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0c0e12] text-[#e4e7eb] font-sans antialiased selection:bg-[#9bd1d4] selection:text-[#0c0e12]">
        {children}
      </body>
    </html>
  );
}

