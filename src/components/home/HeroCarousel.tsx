import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CaseStudy } from '../../types';
import { Link } from '../ui/Link';

interface HeroCarouselProps {
  caseStudies: CaseStudy[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ caseStudies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const goToNextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToPrevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  if (caseStudies.length === 0) {
    return null;
  }

  const currentCase = caseStudies[activeIndex];

  return (
    <section className="relative h-screen overflow-hidden rounded-b-lg">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 transform scale-105 rounded-b-lg"
          style={{ backgroundImage: `url(${currentCase.heroImageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-30 rounded-b-lg"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl text-white">
            <span className="block text-sm md:text-base uppercase tracking-wider mb-2">
              {currentCase.client}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {currentCase.title}
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90 max-w-xl">
              {currentCase.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {currentCase.type.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
            <Link
              to={`/case-study/${currentCase.id}`}
              className="inline-block border-2 border-white px-6 py-3 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300" // 改为胶囊按钮
            >
              查看
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-12 right-12 flex space-x-4">
        <button
          onClick={goToPrevSlide}
          className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" // 改为胶囊按钮
          aria-label="上一张" // 修改 aria-label
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNextSlide}
          className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" // 改为胶囊按钮
          aria-label="下一张"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-12 left-12">
        <div className="flex space-x-2">
          {caseStudies.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-10 h-1 rounded-full ${
                index === activeIndex ? 'bg-white' : 'bg-white/30'
              } transition-all duration-300`}
              aria-label={`跳转到第 ${index + 1} 张`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
