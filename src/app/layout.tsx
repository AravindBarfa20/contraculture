import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SkipToContent } from "@/components/shared/skip-to-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContraCulture — Translation ≠ Conversion",
  description:
    "Your translated landing page is losing you money. ContraCulture uses Hofstede cultural psychology to rewrite your copy for each market.",
  keywords: [
    "i18n", "localization", "cultural adaptation", "hofstede",
    "conversion optimization", "lingo.dev", "hackathon",
  ],
  authors: [{ name: "Aravind", url: "https://github.com/AravindBarfa20" }],
  openGraph: {
    title: "ContraCulture — Translation ≠ Conversion",
    description:
      "Your translated landing page is losing you money. ContraCulture rewrites your copy for each culture using Hofstede psychology.",
    type: "website",
    siteName: "ContraCulture",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContraCulture — Translation ≠ Conversion",
    description:
      "Your translated landing page is losing you money.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SkipToContent />
          <div id="main-content">
            {children}
          </div>
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
