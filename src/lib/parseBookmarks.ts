import { toast } from '@/components/ui/use-toast';

function parseBookmarks(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  function parseDL(dlElement: HTMLElement) {
    const bookmarks = [];
    const children = dlElement.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.tagName === 'DT') {
        const h3 = child.querySelector('h3');
        const a = child.querySelector('a');

        if (h3) {
          const folder = {
            type: 'folder',
            name: h3.textContent,
            children: [] as any[],
          };

          const subDL = child.querySelector('dl');

          if (subDL && subDL.tagName === 'DL') {
            folder.children = parseDL(subDL);
          }
          bookmarks.push(folder);
        } else if (a) {
          bookmarks.push({
            type: 'bookmark',
            name: a.textContent,
            url: a.href,
            icon: a.getAttribute('icon'),
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

function downloadJSON(jsonString: string) {
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

// 示例：读取文件并解析
export default function handleFileUpload(file: File) {
  const reader = new FileReader();

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

    downloadJSON(JSON.stringify(bookmarks, null, 2));
  };

  reader.readAsText(file);
}
