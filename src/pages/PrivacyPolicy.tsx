import React from 'react';
import { Link } from '../components/ui/Link';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="pt-20 md:pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 md:mb-16">
          <Link to="/" className="inline-flex items-center text-gray-600 mb-8 hover:text-black hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            返回首页
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">隐私政策</h1>
          <p className="text-gray-500">最后更新日期： {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-3xl mx-auto text-gray-800 space-y-6">
          <div className="space-y-4">
            <p className="leading-relaxed">欢迎访问 VOFI Design Studio。我们致力于保护您的个人信息和隐私权。如果您对我们的政策或有关您个人信息的做法有任何疑问或疑虑，请通过 <a href="mailto:yung.venue@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">yung.venue@gmail.com</a> 与我们联系。</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">我们收集哪些信息？</h2>
            <div className="space-y-3 pl-4">
              <p className="leading-relaxed">我们可能会收集您在以下场景中自愿提供的个人信息：</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>网站访问与服务使用过程中</li>
                <li>通过邮件、表单等渠道与我们联系时</li>
                <li>参与问卷调查或市场活动时</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">收集的信息类型可能包括：</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>基本信息（姓名、联系方式）</li>
                <li>业务需求相关信息</li>
                <li>设备与访问日志（IP地址、浏览器类型）</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
