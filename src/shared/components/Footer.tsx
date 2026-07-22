"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#09090B] pt-24 pb-12 mt-auto relative z-10 w-full">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-zinc-500 font-semibold">
          &copy; 2026 Student Hub. All rights reserved.
        </p>
        <div className="flex gap-8 text-sm text-zinc-500 font-semibold">
          <span className="hover:text-[#0EA5E9] cursor-pointer transition-colors duration-200">
            Privacy Policy
          </span>
          <span className="hover:text-[#0EA5E9] cursor-pointer transition-colors duration-200">
            Terms of Service
          </span>
          <span className="hover:text-[#0EA5E9] cursor-pointer transition-colors duration-200">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
}
