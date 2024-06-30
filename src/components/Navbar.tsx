import React from 'react';
import Link from 'next/link';

import MaxWidthWrap from './MaxWidthWrap';
import { Button, buttonVariants } from './ui/button';

export default async function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 z-10 h-14 w-full border-b border-border bg-background/40 transition-all">
      <MaxWidthWrap>
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="relative z-10 flex bg-gradient-to-b from-slate-200 to-slate-600 bg-clip-text text-center font-sans font-bold text-transparent"
          >
            TransformBookmark
          </Link>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon">
              <i className="i-lucide-github text-xl text-foreground"></i>
            </Button>
            <Button variant="ghost" size="icon">
              <i className="i-lucide-contact text-xl text-foreground"></i>
            </Button>
          </div>
        </div>
      </MaxWidthWrap>
    </nav>
  );
}
