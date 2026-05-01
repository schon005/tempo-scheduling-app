"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WhitelistPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/manager");
  }, [router]);

  return (
    <main className="flex flex-col gap-4 justify-center items-center text-center min-h-screen">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center filter blur-lg"
        style={{
          backgroundImage: `url('/images/loginpagebackground.webp')`,
        }}
      ></div>

      <div className="bg-black/15 backdrop-blur-md rounded-xl border-2 border-white p-8 flex flex-col items-center justify-center shadow-md w-full max-w-[800px] h-[600px]">
        <Image
          className="mx-auto"
          src="/images/tempo-removebg-preview.png"
          alt="Tempo logo"
          width={180}
          height={40}
          priority
        />

        <div className="text-lg sm:text-xl font-bold mt-4 text-white">
          Access approved. Redirecting...
        </div>
      </div>
    </main>
  );
}