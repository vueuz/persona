import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '../components/ui/Link';
import { getCaseStudyById, caseStudies } from '../data/caseStudies';
import { CaseStudy as CaseStudyType } from '../types';
import { motion } from 'framer-motion'

interface CaseStudyProps {
  id?: string;
}

// 新增图片大图 Modal 组件
const ImageGalleryModal: React.FC<{
  images: { url: string; alt: string }[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  visible: boolean;
}> = ({ images, current, onClose, onPrev, onNext, visible }) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    function handleOrientationChange() {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    }
    handleOrientationChange();
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

  // 新增动画相关hook
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // 优化后的手势处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsAnimating(false); // 重置动画状态
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX && touchEndX) {
      const delta = touchEndX - touchStartX;
      const absDelta = Math.abs(delta);

      if (absDelta > 50) {
        setIsAnimating(true);
        if (delta > 50) {
          setDirection(-1);
          onPrev();
        } else if (delta < -50) {
          setDirection(1);
          onNext();
        }
        // 添加动画计时器
        setTimeout(() => setIsAnimating(false), 500);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  }, [touchStartX, touchEndX]);

  // 新增键盘导航支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (visible) {
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'Escape') onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  if (!visible) return null;
  return (
    <motion.div // 使用Framer Motion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      style={{ touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchMove={(e) => setTouchEndX(e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => e.stopPropagation()} // 新增父容器点击事件处理
    >
      {/* 优化关闭按钮 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors z-[60]" // 提升层级
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          pointerEvents: 'auto',
          zIndex: 60 // 显式设置层级
        }}
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>



      {/* 图片动画容器 */}
      <motion.div
        key={current}
        initial={{ x: direction * 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -direction * 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative flex flex-col items-center gap-6"
      >
        <img
          src={images[current].url}
          alt={images[current].alt}
          className={`${isLandscape ? 'max-w-[95vw] max-h-[60vh]' : 'max-h-[70vh] max-w-[90vw]'}
            shadow-2xl transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
          style={{ borderRadius: 12 }}
        />

        {/* 组合容器 */}
        <div className="w-full max-w-[90vw] flex items-center justify-between px-4">
        <div />


          {/* 图片指示器 */}
          <div className="flex gap-2 mx-4">
            {/* 当前图片进度 */}
            ${  (
              <div className="flex items-center">
                <div className="w-full h-1 bg-white rounded-full">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{ width: `${(current / (images.length - 1)) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-300">{current + 1}/{images.length}</span>
              </div>
            )}
          </div>
          {/* 图片预览按钮 */}
          <div className="flex items-center ">


          {/* 左箭头 */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors mr-4"
            onClick={onPrev}
          >
            <ChevronLeft className="w-6 h-6 text-white" strokeWidth={1.5} />
          </motion.button>
          {/* 右箭头 */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors"
            onClick={onNext}
          >
            <ChevronRight className="w-6 h-6 text-white" strokeWidth={1.5} />
          </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CaseStudy: React.FC<CaseStudyProps> = ({ id = '1' }) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudyType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [nextCaseId, setNextCaseId] = useState<string | null>(null);
  const [prevCaseId, setPrevCaseId] = useState<string | null>(null);

  // 新增：用于控制大图 Modal 的状态
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // 可选：监听横屏，移动端体验优化
  useEffect(() => {
    function handleOrientationChange() {
      // 你可以根据需要在这里处理横屏样式
    }
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

  useEffect(() => {
    // In a real application, you would fetch the case study from an API
    // For this demo, we'll use the local data with a simulated loading delay
    setLoading(true);

    setTimeout(() => {
      const fetchedCaseStudy = getCaseStudyById(id);
      setCaseStudy(fetchedCaseStudy);

      // Find next and previous case study IDs
      const currentIndex = caseStudies.findIndex(cs => cs.id === id);

      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % caseStudies.length;
        const prevIndex = currentIndex === 0 ? caseStudies.length - 1 : currentIndex - 1;

        setNextCaseId(caseStudies[nextIndex].id);
        setPrevCaseId(caseStudies[prevIndex].id);
      }

      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* 修改：加载提示 */}
        <div className="animate-pulse">案例加载中...</div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen pt-32 container mx-auto px-4 md:px-8">
        <div className="text-center">
          {/* 修改：未找到提示 */}
          <h1 className="text-2xl font-bold mb-4">案例未找到</h1>
          <p className="mb-8">您查找的案例不存在或已被移除。</p>
          <Link to="/portfolio" className="inline-block bg-black text-white px-6 py-3">
            {/* 修改：返回按钮 */}
            返回作品集
          </Link>
        </div>
      </div>
    );
  }

  return (
    // 调整主容器的顶部内边距
    <main className="pt-20 md:pt-32">
      {/* 移除 Hero Section */}

      {/* Case Study Details - 将标题、标签等移到这里 */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          {/* 将 Back Link, Title, Tags 移到内容区域顶部 */}
          <div className="mb-12 md:mb-16">
            <Link to="/portfolio" className="inline-flex items-center text-gray-600 mb-8 hover:text-black hover:underline">
              <ArrowLeft size={16} className="mr-2" />
              {/* 修改：返回按钮 */}
              返回作品集
            </Link>

            <div className="max-w-3xl"> {/* 可以调整最大宽度 */}
              <span className="block text-sm uppercase tracking-wider mb-2 text-gray-500">{caseStudy.client}</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">{caseStudy.title}</h1>

              <div className="flex flex-wrap gap-2 mb-8">
                {caseStudy.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"> {/* 调整标签样式 */}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <p className="text-xl leading-relaxed text-gray-800 mb-12">
                {caseStudy.description}
              </p>

              {caseStudy.content && caseStudy.content.map((item, index) => (
                <div key={index} className="mb-12">
                  {item.heading && (
                    <h2 className="text-2xl font-bold mb-4">{item.heading}</h2>
                  )}

                  {item.text && (
                    <p className="text-gray-700 mb-6 leading-relaxed">{item.text}</p>
                  )}

                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt || caseStudy.title}
                      className="w-full h-auto rounded-lg shadow-md" // 添加圆角和阴影
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Project Details Sidebar */}
            <div>
              {/* 保持 Sticky 效果 */}
              <div className="bg-gray-50 p-8 sticky top-24 md:top-32 rounded-lg shadow-sm">
                {/* 修改：侧边栏标题 */}
                <h3 className="text-xl font-bold mb-6">项目详情</h3>

                <div className="space-y-6">
                  <div>
                    {/* 修改：侧边栏字段 */}
                    <h4 className="text-sm font-medium text-gray-500 mb-1">客户</h4>
                    <p>{caseStudy.client}</p>
                  </div>

                  <div>
                    {/* 修改：侧边栏字段 */}
                    <h4 className="text-sm font-medium text-gray-500 mb-1">行业</h4>
                    <p>{caseStudy.industry}</p>
                  </div>

                  <div>
                    {/* 修改：侧边栏字段 */}
                    <h4 className="text-sm font-medium text-gray-500 mb-1">项目类型</h4>
                    <div className="flex flex-wrap gap-x-2 gap-y-1"> {/* 调整类型间距 */}
                      {caseStudy.type.map((type, index) => (
                        <span key={index} className="text-sm">
                          {type}{index < caseStudy.type.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* 修改：侧边栏字段 */}
                    <h4 className="text-sm font-medium text-gray-500 mb-1">项目规模</h4>
                    <p>{caseStudy.projectSize}</p>
                  </div>

                  <div>
                    {/* 修改：侧边栏字段 */}
                    <h4 className="text-sm font-medium text-gray-500 mb-1">年份</h4>
                    <p>{caseStudy.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          {/* 修改：图库标题 */}
          <h2 className="text-2xl font-bold mb-12">项目案例图</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
            {caseStudy.images.map((image, index) => (
              <div key={index} className="overflow-hidden shadow-sm cursor-pointer rounded-xl"
                onClick={() => {
                  setModalIndex(index);
                  setModalOpen(true);
                }}>
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105 "
                />
              </div>
            ))}
          </div>
        </div>
        {/* 大图 Modal 组件 */}
        <ImageGalleryModal
          images={caseStudy.images}
          current={modalIndex}
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          onPrev={() => setModalIndex((modalIndex - 1 + caseStudy.images.length) % caseStudy.images.length)}
          onNext={() => setModalIndex((modalIndex + 1) % caseStudy.images.length)}
        />
      </section>

      {/* Navigation to Other Case Studies */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            {prevCaseId && (
              <Link to={`/case-study/${prevCaseId}`} className="group mb-8 md:mb-0">
                <div className="flex items-center text-gray-500 mb-2 group-hover:text-black transition-colors">
                  <ChevronLeft size={16} className="mr-1" />
                  {/* 修改：导航链接 */}
                  <span>上一个案例</span>
                </div>
                <span className="text-xl font-medium group-hover:underline">
                  {getCaseStudyById(prevCaseId)?.title}
                </span>
              </Link>
            )}

            {nextCaseId && (
              <Link to={`/case-study/${nextCaseId}`} className="group text-right">
                <div className="flex items-center justify-end text-gray-500 mb-2 group-hover:text-black transition-colors">
                  {/* 修改：导航链接 */}
                  <span>下一个案例</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
                <span className="text-xl font-medium group-hover:underline">
                  {getCaseStudyById(nextCaseId)?.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudy;
