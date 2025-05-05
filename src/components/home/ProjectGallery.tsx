import React, { useRef, useEffect } from 'react';



interface ProjectGalleryProps {
  images: string[];
}


const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 动态管理引用数组
  const getRef = (index: number) => (el: HTMLDivElement | null) => {
    imageRefs.current[index] = el;
  };

  // 新增滚动控制逻辑
  const scrollToCenter = (index: number) => {
    const container = containerRef.current;
    const element = imageRefs.current[index];

    if (container && element) {
      const containerWidth = container.offsetWidth;
      const elementLeft = element.offsetLeft - container.offsetLeft;
      const scrollPosition = elementLeft - (containerWidth - element.offsetWidth) / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const Placeholder = React.memo(() => (
    <div className="flex-shrink-0 w-1/3 h-full p-2 max-md:hidden" aria-hidden="true" />
  ));

  return (
    <div className="absolute left-0 w-full ">
      <div className="relative w-screen">
        {/* Scroll Container */}
        <div
          // Use snap-center on the container as well for better overall behavior (optional but recommended)
          className="snap-x snap-mandatory overflow-x-scroll flex h-[400px] scrollbar-hide"
        >
          <Placeholder />
          {images.map((img, index) => (
            <div
              key={index}
              ref={el => imageRefs.current[index] = el}
              className="snap-center flex-shrink-0 h-full p-2 max-md:w-[calc(100vw-4rem)] max-md:px-8"
            >
              <div className="h-full overflow-hidden rounded-xl transition-transform duration-300">
                <img
                  src={img}
                  alt={`Project ${index + 1}`}
                  className="h-full object-contain shadow-lg "
                />
              </div>
            </div>
          ))}
          <Placeholder />
        </div>



      </div>
    </div>
  );
};

export default ProjectGallery;
