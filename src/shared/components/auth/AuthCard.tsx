"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Card className="relative overflow-hidden w-full max-w-[520px] rounded-[28px] border border-[#E2E0DB] bg-white p-8 sm:p-12 shadow-2xs">
      {children}
    </Card>
  );
}