import * as XLSX from 'xlsx';

import { toast } from '@/components/ui/use-toast';

export type Bookmark = {
  type: 'folder' | 'bookmark';
  name: string;
  url?: string;
  icon?: string;
  children?: Bookmark[];
};

function parseBookmarks(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  function parseDL(dlElement: HTMLElement) {
    const bookmarks: Bookmark[] = [];
    const children = dlElement.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.tagName === 'DT') {
        const h3 = child.querySelector('h3');
        const a = child.querySelector('a');

        if (h3) {
          const folder: Bookmark = {
            type: 'folder',
            name: h3.textContent ?? '',
            children: [],
          };

          const subDL = child.querySelector('dl');

          if (subDL && subDL.tagName === 'DL') {
            folder.children = parseDL(subDL);
          }
          bookmarks.push(folder);
        } else if (a) {
          bookmarks.push({
            type: 'bookmark',
            name: a.textContent ?? '',
            url: a.href,
            icon: a.getAttribute('icon') ?? '',
          });
        }
      }
    }
    return bookmarks;
  }

  const rootDL = doc.querySelector('dl');

  if (!rootDL) {
    toast({
      title: '无法解析书签',
      description: '未找到书签内容',
      variant: 'destructive',
    });
    return;
  }

  const bookmarks = parseDL(rootDL);
  return bookmarks;
}

// 示例：读取文件并解析
export default function handleFileUpload(file: File) {
  const reader = new FileReader();

  return new Promise<Bookmark[]>((resolve, reject) => {
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const htmlString = e.target?.result;

      if (!htmlString) {
        toast({
          title: '无法解析书签',
          description: '未找到书签内容',
          variant: 'destructive',
        });
        return;
      }
      const bookmarks = parseBookmarks(htmlString as string);
      if (!bookmarks) {
        reject(new Error('未找到书签内容'));
        return;
      }

      resolve(bookmarks);
    };

    reader.readAsText(file);
  });
}

export function downloadJSON(jsonString: string) {
  // 创建一个 Blob 对象
  const blob = new Blob([jsonString], { type: 'application/json' });

  // 创建一个下载链接
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bookmark.json';

  // 触发下载操作
  document.body.appendChild(a);
  a.click();

  // 移除下载链接
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function convertToExcel(data: Bookmark[]) {
  const flatBookmarks: { Folder: string; Name: string; URL: string }[] = [];
  function flattenBookmarks(bookmarks?: Bookmark[], path = '') {
    bookmarks?.forEach(bookmark => {
      if (bookmark.type === 'folder') {
        flattenBookmarks(bookmark.children, path + bookmark.name + '/');
      } else {
        flatBookmarks.push({
          Folder: path.slice(0, -1) || '其他书签', // Remove trailing slash
          Name: bookmark.name,
          URL: bookmark.url ?? '',
        });
      }
    });
  }
  flattenBookmarks(data);

  const worksheet = XLSX.utils.json_to_sheet(flatBookmarks);

  // 设置列宽度
  const columnWidths = [
    { wch: 40 }, // 第一列宽度
    { wch: 70 }, // 第二列宽度
    { wch: 80 }, // 第三列宽度
  ];

  worksheet['!cols'] = columnWidths;

  // Add data to the worksheet and format URL as hyperlink
  flatBookmarks.forEach((row, index) => {
    const rowIndex = index + 2; // Start from row 2 to skip headers
    worksheet[`A${rowIndex}`] = { v: row.Folder };
    worksheet[`B${rowIndex}`] = { v: row.Name };
    worksheet[`C${rowIndex}`] = {
      f: `HYPERLINK("${row.URL}", "${row.URL}")`,
      l: { Target: row.URL, Tooltip: row.URL },
    };
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookmarks');

  XLSX.writeFile(workbook, 'bookmarks.xlsx');
}
