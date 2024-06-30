'use client';

import React from 'react';
import Dropzone from 'react-dropzone';
import handleFileUpload, { Bookmark } from '@/lib/parseBookmarks';

const UploadDropzone = ({ success }: { success?: (data: Bookmark[]) => void }) => {
  return (
    <Dropzone
      multiple={false}
      accept={{
        'text/html': ['.html'],
      }}
      onDrop={async acceptedFiles => {
        const file = acceptedFiles[0];
        const data = await handleFileUpload(file);
        success?.(data);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => {
        return (
          <div
            {...getRootProps()}
            className="z-10 box-border flex w-screen rounded-lg border border-dashed border-border bg-background/40 duration-100 hover:bg-secondary/40 sm:h-64 sm:w-96"
          >
            <div className="flex h-full w-full items-center justify-center">
              <label htmlFor="dropzone-file" className="flex size-full cursor-pointer flex-col items-center justify-center rounded-lg p-8">
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <i className="i-lucide-cloud mb-2 size-6 text-foreground" />
                  <p className="mb-2 text-sm text-slate-500">
                    <span className="font-semibold">点击</span> 或 <span className="font-semibold">拖拽</span>上传文件
                  </p>
                  <p className="text-xs text-slate-600">上传书签HTML文件</p>
                </div>
                {acceptedFiles && acceptedFiles[0] ? (
                  <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-background outline outline-[1px] outline-zinc-200">
                    <div className="grid h-full place-items-center px-3 py-2">
                      <i className="i-lucide-file size-4 text-foreground" />
                    </div>
                    <div className="h-full truncate px-3 py-2 text-sm text-foreground">{acceptedFiles[0].name}</div>
                  </div>
                ) : null}

                <input type="file" id="dropzone-file" className="hidden" {...getInputProps()} />
              </label>
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
};

export default UploadDropzone;
