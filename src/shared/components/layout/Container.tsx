/**
 * Site-wide centered content container.
 * Use this inside every section/page.
 * Background can be full-width on the parent; content stays centered here.
 */
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Allow wider container for specific sections */
  size?: "default" | "wide" | "narrow";
}

export default function Container({ children, className, size = "default" }: ContainerProps) {
  const maxW = {
    default: "max-w-[1280px]",
    wide:    "max-w-[1440px]",
    narrow:  "max-w-[860px]",
  }[size];

  return (
    <div className={cn(
      "mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10",
      maxW,
      className
    )}>
      {children}
    </div>
  );
}
