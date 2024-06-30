import { FlipWords } from '@/components/FlipWords';
import { Spotlight } from '@/components/Spotlight';
import UploadDropzone from '@/components/UploadDropzone';

// const words = ['JSON', 'Excel', 'PDF'];
// const color = ['text-yellow-400', 'text-green-400', 'text-red-400'];

const words = ['JSON'];
const color = ['text-yellow-400'];

export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-16 py-20 sm:space-y-28 sm:py-28 ">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#fffbeb" />
      <div className="flex flex-col items-center justify-center px-4">
        <div className="relative z-10 flex bg-gradient-to-b from-slate-200 to-slate-600 bg-clip-text text-center font-sans text-lg font-bold text-transparent sm:text-4xl">
          将书签转换为
          <span className="inline-block w-[70px] text-center sm:min-w-32">
            <FlipWords words={words} wordColors={color} />
          </span>
          从未如此简单
        </div>
        <p className="relative z-10 mx-auto my-2 max-w-lg text-center text-slate-500">
          打开 Chrome 浏览器，在地址栏输入 chrome://bookmarks/ 并按回车键，在页面右上角，点击菜单，选择
          导出书签，将书签文件保存到您的电脑上，然后上传到网站。
        </p>
      </div>

      <UploadDropzone />
    </main>
  );
}
