import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

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

export const metadata = {
  title: "Tempo Scheduling",
  description: "Tempo platform for scheduling",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          
          {/* 🔥 HARD FIX: LARGE SAFE SPACING FOR HEADER */}
          <div className="pt-[140px] sm:pt-[120px] md:pt-[110px]">
            {children}
          </div>

        </body>
      </html>
    </ClerkProvider>
  );
}