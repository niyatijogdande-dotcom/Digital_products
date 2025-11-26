import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "GoDigiStore – Premium Digital Products in India",
  description: "Best digital products in India. Premium reels bundles, YouTube thumbnails, templates, e-books and more. 2000+ Digital Products at Affordable Prices.",
  keywords: "digital products, reels bundle, youtube thumbnails, templates, GoDigiStore, premium digital tools India, e-books, notion templates, digital downloads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}