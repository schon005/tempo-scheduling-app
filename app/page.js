"use client";

import { SignUpButton, SignedOut, useAuth } from '@clerk/nextjs';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/whitelist");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-10 sm:px-20 text-black">
      
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center blur-lg"
        style={{
          backgroundImage: `url('/images/loginpagebackground.webp')`,
        }}
      />

      <SignedOut>
        <main className="flex flex-col items-center justify-center text-center w-full max-w-[900px]">
          
          {/* Main Card */}
          <div className="bg-black/15 backdrop-blur-md rounded-xl border-2 border-white p-6 sm:p-8 flex flex-col items-center justify-center shadow-md w-full max-w-[700px] min-h-[420px]">
            
            <Image
              className="mx-auto"
              src="/images/tempo-removebg-preview.png"
              alt="Tempo logo"
              width={160}
              height={40}
              priority
            />

            <div className="text-lg sm:text-xl font-[family-name:var(--font-geist-mono)] mt-4 font-bold">
              The best scheduling platform on planet Earth.
            </div>

            <div className="flex justify-center mt-10">
              <SignUpButton>
                <button 
                  className="rounded-full border border-black transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-base h-12 w-40 px-5 font-bold"
                >
                  Get Started →
                </button>
              </SignUpButton>
            </div>

          </div>

          {/* Footer */}
          <footer className="flex flex-wrap gap-6 items-center justify-center mt-12 font-semibold text-sm sm:text-base">
            
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>📄</span>
              About us
            </a>

            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nicepage.com/website-mockup/preview/our-partners-83938?device=desktop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🤝</span>
              Our partners
            </a>

            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="/"
            >
              <Image
                aria-hidden
                src="/images/default-avatar.png"
                alt="User icon"
                width={16}
                height={16}
              />
              Go to a new tab →
            </a>

          </footer>

        </main>
      </SignedOut>
    </div>
  );
}