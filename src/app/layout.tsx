import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "computed",
  description:
    "Thoughts on technology, physics, and everything in between. Written plainly, without jargon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-sage-dark/50 py-8 mt-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-sm text-ink-light font-sans">
              © {new Date().getFullYear()} Computed. Made with curiosity.
            </p>
          </div>
        </footer>
        
        {/* Floating Admin Icon */}
        <Link 
          href="/admin"
          className="fixed bottom-6 right-6 p-3 bg-white border border-sage-dark/30 rounded-full shadow-sm text-ink-light hover:text-ink hover:border-sage-dark hover:shadow-md transition-all duration-200 z-50"
          title="Admin Portal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 Z"></path>
          </svg>
        </Link>
      </body>
    </html>
  );
}
