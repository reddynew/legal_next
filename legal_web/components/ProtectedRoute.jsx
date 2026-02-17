"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/LoginContext";

export default function ProtectedRoute({ children }) {
  const { loading, accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('[ProtectedRoute] state update:', { loading, accessToken });
    if (!loading && !accessToken) {
      console.log(`[ProtectedRoute] REDIRECTING to / : loading=${loading}, accessToken=${accessToken}`)
      router.replace("/"); // redirect to login
    }
  }, [loading, accessToken, router]);

  if (loading) return <div>Loading...</div>;

  if (!accessToken) return null; // prevent flicker before redirect

  return <>{children}</>;
}
