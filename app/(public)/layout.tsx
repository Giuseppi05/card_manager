import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

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
        <AuthProvider>
          <div className="relative">
            {/* Formas decorativas de fondo */}
            <div className="absolute z-10 inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid de cartas decorativas */}
            <div className="absolute z-10 inset-0 overflow-hidden pointer-events-none opacity-5">
              <div className="absolute top-20 left-10 w-16 h-24 bg-primary-500 rounded-lg transform rotate-12"></div>
              <div className="absolute top-40 right-20 w-16 h-24 bg-secondary-500 rounded-lg transform -rotate-6"></div>
              <div className="absolute bottom-32 left-1/4 w-16 h-24 bg-primary-500 rounded-lg transform rotate-45"></div>
              <div className="absolute bottom-20 right-1/3 w-16 h-24 bg-secondary-500 rounded-lg transform -rotate-12"></div>
            </div>

            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
