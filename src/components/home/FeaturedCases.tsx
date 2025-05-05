import React from 'react';
import { CaseStudy } from '../../types';
import { Link } from '../ui/Link';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedCasesProps {
  caseStudies: CaseStudy[];
}

const FeaturedCases: React.FC<FeaturedCasesProps> = ({ caseStudies }) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">精选案例</h2>
            <p className="text-gray-600 max-w-xl">
              探索我们的精选项目，展示我们在不同行业中创造引人入胜的视觉叙事的专业能力。
            </p>
          </div>
          <Link
            to="/portfolio"
            className="mt-6 md:mt-0 inline-flex items-center text-black hover:underline group px-5 py-2 rounded-full hover:bg-gray-100 transition-colors" // 改为胶囊按钮样式
          >
            <span>查看所有项目</span>
            <ArrowUpRight
              className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" // 调整间距
              size={16} // 调整大小
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy) => (
            <Link key={caseStudy.id} to={`/case-study/${caseStudy.id}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[16/9] mb-4 shadow-lg rounded-xl">
                  <img
                    src={caseStudy.thumbnailUrl}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:underline">
                  {caseStudy.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{caseStudy.client}</span>
                  <span className="text-gray-400 text-sm">{caseStudy.year}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {caseStudy.type.slice(0, 2).map((type, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full" // 增加了 rounded-full 并调整了 padding
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCases;
