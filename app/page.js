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
    <div className="relative min-h-screen flex items-center justify-center px-6 py-10 text-black">
      
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center blur-lg"
        style={{
          backgroundImage: `url('/images/loginpagebackground.webp')`,
        }}
      />

      <SignedOut>
        <main className="flex flex-col items-center text-center w-full max-w-[800px]">
          
          <div className="bg-black/15 backdrop-blur-md rounded-xl border-2 border-white p-8 flex flex-col items-center shadow-md w-full">

            <Image
              src="/images/tempo-removebg-preview.png"
              alt="Tempo logo"
              width={160}
              height={40}
            />

            <p className="mt-4 font-bold text-lg">
              The best scheduling platform on planet Earth.
            </p>

            <div className="mt-10">
              <SignUpButton>
                <button className="rounded-full border border-black bg-black text-white px-6 py-3 font-bold">
                  Get Started →
                </button>
              </SignUpButton>
            </div>

          </div>

        </main>
      </SignedOut>
    </div>
  );
}