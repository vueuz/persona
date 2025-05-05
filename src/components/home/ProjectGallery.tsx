import React, { useRef, useEffect } from 'react';



interface ProjectGalleryProps {
  images: string[];
}


const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 初始化引用数组
  useEffect(() => {
    // 重置引用数组以匹配当前图片数量
    imageRefs.current = Array(images.length).fill(null);
  }, [images.length]);



  const Placeholder = () => (
     <div
      className="flex-shrink-0 w-[calc(100%/3)] h-full p-2"
      aria-hidden="true"
    />
  );

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
              // 保存对每个图片元素的引用
              ref={el => imageRefs.current[index] = el}
              // *** CHANGE: Use snap-center for items ***
              className="snap-center flex-shrink-0 h-full p-2" // 移除固定宽度，允许根据内容自适应
            >
              <div className="h-full overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ">
                <img
                  src={img}
                  alt={`Project ${index + 1}`}
                  className="h-full object-contain" // 使用object-contain确保图片按比例缩放而不裁剪
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
