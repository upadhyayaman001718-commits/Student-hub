"use client";

import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="relative w-full max-w-[440px] space-y-6">
      {children}
    </div>
  );
}
