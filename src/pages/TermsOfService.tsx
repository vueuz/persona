import React from 'react';
import { Link } from '../components/ui/Link';
import { ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <main className="pt-20 md:pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-16">
          <Link to="/" className="inline-flex items-center text-gray-600 mb-8 hover:text-black hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            返回首页
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">服务条款</h1>
          <p className="text-gray-500">最后更新日期： {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-3xl mx-auto text-gray-800 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">服务协议</h2>
            <p className="leading-relaxed">欢迎使用 VOFI Design Studio 提供的服务。通过访问或使用我们的网站和服务，您同意遵守以下条款与条件。</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">服务使用</h2>
            <div className="space-y-3 pl-4">
              <ul className="list-disc space-y-2 pl-6">
                <li>不得将服务用于任何非法目的</li>
                <li>禁止逆向工程或干扰服务正常运行</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">知识产权</h2>
            <p className="leading-relaxed">网站所有内容（包括但不限于文本、图形、标识、代码）均受著作权法保护，未经书面许可不得复制或使用。</p>
          </section>



         

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">联系我们</h2>
            <div className="space-y-2 pl-4">
              <p className="leading-relaxed">如有任何疑问，请通过以下方式联系：</p>
              <div className="flex flex-col space-y-2">
                <a href="mailto:yung.venue@gmail.com" className="text-blue-600 hover:text-blue-800 inline-flex items-center transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  yung.venue@gmail.com
                </a>
                <a href="tel:+8615669657703" className="text-blue-600 hover:text-blue-800 inline-flex items-center transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  +86 156-6965-7703
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
