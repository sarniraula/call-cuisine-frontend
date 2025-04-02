"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard"); // Redirect to Dashboard
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-2xl font-semibold">Redirecting to Dashboard...</p>
    </div>
  );
}
