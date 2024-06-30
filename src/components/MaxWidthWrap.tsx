import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

export default function MaxWidthWrap({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>{children}</div>;
}
