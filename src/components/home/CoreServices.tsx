import React from 'react';
import { Briefcase, LayoutDashboard, Smartphone, Presentation, Users, Image as ImageIcon } from 'lucide-react';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: Service[] = [
  { icon: Presentation, title: '演示设计', description: 'PowerPoint / Keynote' },
  { icon: LayoutDashboard, title: '网站设计与开发', description: '响应式、用户友好的网站' },
  { icon: Briefcase, title: '解决方案设计', description: '定制化业务解决方案' },
  { icon: Users, title: '用户体验设计', description: '提升用户满意度和易用性' },
  { icon: Smartphone, title: '移动应用设计', description: 'iOS & Android 应用界面' },
  { icon: ImageIcon, title: '海报设计', description: '引人注目的视觉宣传品' },
];

const CoreServices: React.FC = () => {
  return (
    // 移除 section 上的 overflow-hidden
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">核心技能与服务</h2>
        {/*
          移动端: flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-hide
          PC端 (md及以上): grid grid-cols-2 lg:grid-cols-3 gap-8 overflow-visible pb-0 space-x-0
        */}
        <div className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:space-x-0">
          {/* 占位符仅在移动端显示 */}
          <div className="flex-shrink-0 w-14 snap-center md:hidden" aria-hidden="true"></div> {/* 左侧占位 */}
          {services.map((service, index) => (
            <div
              key={index}
              // 移动端: flex-shrink-0 w-72 snap-center
              // PC端: w-auto (宽度由 grid 控制)
              className="flex-shrink-0 w-25 bg-gray-100 p-8 rounded-lg text-center transition-shadow duration-300 hover:shadow-lg snap-center md:w-auto md:flex-shrink-1" // 移除 md:w-80, 移除 snap-center for md+, 确保 PC 不收缩
            >
              <service.icon className="mx-auto mb-4 text-blue-600" size={40} strokeWidth={1.5} />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
           {/* 占位符仅在移动端显示 */}
           <div className="flex-shrink-0 w-14 snap-center md:hidden" aria-hidden="true"></div> {/* 右侧占位 */}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
