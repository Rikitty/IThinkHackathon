import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "VIBE",
  description: "VIBE IThinkHackaton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}

        style={{
          backgroundImage: 'url("/assets/background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}      >
        {children}
      </body>
    </html>
  );
}
