import React from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedCases from '../components/home/FeaturedCases';
import { getFeaturedCaseStudies } from '../data/caseStudies';
import { Link } from '../components/ui/Link'; // 引入 Link 组件
import { ArrowUpRight } from 'lucide-react'; // 引入图标
import ProjectGallery from '../components/home/ProjectGallery';

const Home: React.FC = () => {
  const featuredCaseStudies = getFeaturedCaseStudies();

  console.log(featuredCaseStudies);

  const galleryImages = featuredCaseStudies[0]?.images.map((image) => image.url);


  // 示例项目数据（需要根据实际数据结构调整）
  // const sampleProject = {
  //   id: 1,
  //   images: [
  //     '/images/project1-1.jpg',
  //     '/images/project1-2.jpg',
  //     '/images/project1-3.jpg'
  //   ]
  // };

  return (
    <main>
      <HeroCarousel caseStudies={featuredCaseStudies} />
      <FeaturedCases caseStudies={featuredCaseStudies} />

      {/* 项目展示部分移到这里，并设置背景色 */}
      <section className="py-24 bg-gray-200">
        <div className="container px-4 md:px-8 w-full h-[600px]" >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">项目展示</h2>
          <ProjectGallery images={galleryImages}  />
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-2xl mb-12 md:mb-0">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                通过强大的视觉叙事重塑品牌形象
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                我们是一家专注于创造引人入胜的视觉叙事的设计工作室，旨在提升品牌形象并吸引受众。
              </p>
              <Link
                to="/about"
                className="inline-flex items-center border-2 border-white px-6 py-3 text-white hover:bg-white hover:text-black transition-colors duration-300 rounded-full group" // 改为胶囊按钮
              >
                <span>关于我们</span>
                 <ArrowUpRight
                  className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={16}
                />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:w-1/3">
              <div className="bg-white/10 p-6 md:p-8 rounded-lg">
                <p className="text-3xl md:text-4xl font-bold mb-2">50+</p>
                <p className="text-gray-300">服务品牌</p>
              </div>
              <div className="bg-white/10 p-6 md:p-8 rounded-lg">
                <p className="text-3xl md:text-4xl font-bold mb-2">100%</p>
                <p className="text-gray-300">项目交付</p>
              </div>
              <div className="bg-white/10 p-6 md:p-8 rounded-lg">
                <p className="text-3xl md:text-4xl font-bold mb-2">15+</p>
                <p className="text-gray-300">服务行业</p>
              </div>
              <div className="bg-white/10 p-6 md:p-8 rounded-lg">
                <p className="text-3xl md:text-4xl font-bold mb-2">3</p>
                <p className="text-gray-300">设计奖项</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">准备好合作了吗？</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            让我们携手合作，创造引人入胜的视觉体验，提升您的品牌价值。
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors rounded-full group" // 改为胶囊按钮
          >
            <span>联系我们</span>
             <ArrowUpRight
              className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              size={16}
            />
          </Link>
        </div>
      </section>

      {/* 原来的项目展示部分已移走 */}
      {/* <section className="py-24 bg-gary ">
        <div className="container px-4 md:px-8 w-full" >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">项目展示</h2>
          <ProjectGallery images={galleryImages}  />
        </div>
      </section> */}
    </main>
  );
};

export default Home;
