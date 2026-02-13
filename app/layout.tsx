import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { ConvexClientProvider } from "@/lib/ConvexClientProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todo",
  description: "Full-stack todo app with Convex and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
          appearance={{
            theme: dark,
          }}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
