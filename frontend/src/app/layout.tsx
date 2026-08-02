import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import { Toaster } from "@/components/ui/sonner";
import AuthInitializer from "@/components/auth/AuthInitializer";
import InterceptorProvider from "@/components/providers/InterceptorProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "URL Shortener Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  suppressHydrationWarning
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
      <body className="min-h-full flex flex-col">
  <ReduxProvider>
     <ThemeProvider>
    <InterceptorProvider>
      <AuthInitializer />
      {children}
      <Toaster />
    </InterceptorProvider>
    </ThemeProvider>
  </ReduxProvider>
</body>
    </html>
  );
}