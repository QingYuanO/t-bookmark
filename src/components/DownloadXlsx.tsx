'use client';

import React from 'react';
import { Bookmark, convertToExcel } from '@/lib/parseBookmarks';

import { Button } from './ui/button';

export default function DownloadJson(props: { data: Bookmark[] }) {
  const { data } = props;
  return (
    <div className="z-10 flex w-full items-center justify-between rounded-lg border border-border bg-background/40 p-4 sm:w-96">
      <span>bookmark.xlsx</span>
      <Button
        variant="outline"
        onClick={() => {
          convertToExcel(data);
        }}
      >
        下载
      </Button>
    </div>
  );
}
