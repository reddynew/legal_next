"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/LoginContext";

export default function ProtectedRoute({ children }) {
  const { loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !login) {
      router.replace("/"); // redirect to login
    }
  }, [loading, login, router]);

  if (loading) return <div>Loading...</div>;

  if (!login) return null; // prevent flicker before redirect

  return <>{children}</>;
}
