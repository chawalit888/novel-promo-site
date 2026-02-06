"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-amber-900/20">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <span className="font-bold text-lg text-amber-100 tracking-wide">
            NovelPromo
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-zinc-300 hover:text-amber-400 transition-colors text-sm"
          >
            หน้าแรก
          </Link>
          <Link
            href="/novels/pantanakan-rattikan"
            className="text-zinc-300 hover:text-amber-400 transition-colors text-sm"
          >
            นิยาย
          </Link>
          <Link
            href="/blog"
            className="text-zinc-300 hover:text-amber-400 transition-colors text-sm"
          >
            บทความ
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-zinc-300 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-amber-900/20 px-4 py-4 space-y-3">
          <Link
            href="/"
            className="block text-zinc-300 hover:text-amber-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            หน้าแรก
          </Link>
          <Link
            href="/novels/pantanakan-rattikan"
            className="block text-zinc-300 hover:text-amber-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            นิยาย
          </Link>
          <Link
            href="/blog"
            className="block text-zinc-300 hover:text-amber-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            บทความ
          </Link>
        </div>
      )}
    </header>
  );
}
