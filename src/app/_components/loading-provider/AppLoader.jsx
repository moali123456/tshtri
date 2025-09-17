"use client";

import { useLoading } from "./LoadingProvider";
import { Loader2 } from "lucide-react"; // You can use any spinner

export default function AppLoader() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <Loader2 className="h-10 w-10 animate-spin text-green-600" />
    </div>
  );
}
