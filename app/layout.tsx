import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import BackgroundDecorations from "@/components/BackgroundDecorations";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Card Manager",
  description: "Card management game application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Providers>
          <div className="relative">
            <BackgroundDecorations />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
