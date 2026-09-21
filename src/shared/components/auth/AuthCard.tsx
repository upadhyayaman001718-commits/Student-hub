"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Card className="relative overflow-hidden w-full max-w-[500px] rounded-3xl border border-white/10 bg-[#0F121E]/90 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
      {children}
    </Card>
  );
}