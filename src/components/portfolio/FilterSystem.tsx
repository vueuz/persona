import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { Filter, X } from 'lucide-react';
import type { Industry, CaseType, ProjectSize, FilterState } from '../../types';

interface FilterSystemProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

// 可复用的筛选区域组件
const FilterSection: React.FC<{ title: string; items: string[]; selectedItems: string[]; onToggle: (item: any) => void }> = ({ title, items, selectedItems, onToggle }) => (
  <div className="mb-6">
    <h3 className="text-sm font-medium text-gray-500 mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedItems.includes(item)
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);


const FilterSystem: React.FC<FilterSystemProps> = ({ filters, onFilterChange }) => {
  // --- 状态管理 ---
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // 移动端 Modal
  const [isDesktopDrawerOpen, setIsDesktopDrawerOpen] = useState(false); // 桌面端 Drawer
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(true); // 桌面端悬浮按钮可见性
  const lastScrollY = useRef(0); // 使用 useRef 存储上一次滚动位置，避免不必要的重渲染

  // --- 数据 ---
  const industries: Industry[] =[
  '科技',
  '医疗',
  '销售',
  '金融',
  '教育',
  '建筑',
  '娱乐',
  '文化',
  '公益',
  '农业',
  '食品',
  '工业',
  '其他',
];
  const types: CaseType[] = [
    '商业计划书',
    '方案策划',
    '品牌宣传',
    '市场调研',
    '数字营销',
    '品牌识别',
    '演示设计',
    '包装设计',
    '印刷品设计',
    '融资咨询',
  ];
  const projectSizes: ProjectSize[] = ['小型', '中型', '大型'];

  // --- 效果 ---
  // 移动端 Modal 打开时锁定背景滚动
  useEffect(() => {
    if (isFilterModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFilterModalOpen]);

  // 桌面端 Drawer 打开时锁定背景滚动
   useEffect(() => {
    if (isDesktopDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isDesktopDrawerOpen]);

  // 桌面端滚动方向检测，控制悬浮按钮显隐
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // 检查是否在桌面视图 (简单示例，可根据需要调整断点)
      const isDesktop = window.innerWidth >= 768; // Tailwind 'md' breakpoint

      if (isDesktop) {
        // 在顶部附近或滚动距离较小时始终显示
        if (currentScrollY < 100) {
           setIsScrollButtonVisible(true);
        } else if (currentScrollY > lastScrollY.current + 5) { // 向下滚动超过5px阈值
          setIsScrollButtonVisible(false);
        } else if (currentScrollY < lastScrollY.current - 5) { // 向上滚动超过5px阈值
          setIsScrollButtonVisible(true);
        }
      } else {
        // 移动端始终隐藏桌面按钮（虽然CSS已处理，但逻辑上也处理一下）
        setIsScrollButtonVisible(false);
      }
      lastScrollY.current = currentScrollY; // 更新上一次滚动位置
    };

    // 初始检查一次
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll); // 窗口大小变化时也检查

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }
  }, []); // 空依赖数组，仅在挂载和卸载时运行


  // --- 事件处理 ---
  const toggleIndustry = (industry: Industry) => {
    const updated = filters.industries.includes(industry) ? filters.industries.filter(i => i !== industry) : [...filters.industries, industry];
    onFilterChange({ ...filters, industries: updated });
  };

  const toggleType = (type: CaseType) => {
    const updated = filters.types.includes(type) ? filters.types.filter(t => t !== type) : [...filters.types, type];
    onFilterChange({ ...filters, types: updated });
  };

  const toggleProjectSize = (size: ProjectSize) => {
    const updated = filters.projectSizes.includes(size) ? filters.projectSizes.filter(s => s !== size) : [...filters.projectSizes, size];
    onFilterChange({ ...filters, projectSizes: updated });
  };

  const clearFilters = () => {
    onFilterChange({ industries: [], types: [], projectSizes: [] });
  };

  const hasActiveFilters = filters.industries.length > 0 || filters.types.length > 0 || filters.projectSizes.length > 0;

  const toggleFilterModal = () => setIsFilterModalOpen(!isFilterModalOpen);
  const toggleDesktopDrawer = () => setIsDesktopDrawerOpen(!isDesktopDrawerOpen);
  const closeDesktopDrawer = () => setIsDesktopDrawerOpen(false);

  return (
    <>
      {/* --- 桌面端筛选 (悬浮按钮 + 抽屉) --- */}
      <div className="hidden md:block">
        {/* 悬浮按钮 */}
        <button
          onClick={toggleDesktopDrawer}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-2 px-6 py-3 rounded-full bg-white/60 backdrop-blur-lg shadow-lg text-black hover:bg-white/80 border border-gray-200 ${
            isScrollButtonVisible
              ? 'animate-show-button'
              : 'animate-hide-button'
          }`}
          aria-label="筛选项目"
        >
          <Filter size={18} />
          <span>筛选项目</span>
        </button>

        {/* 抽屉背景遮罩 */}
        {isDesktopDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xl z-40 transition-opacity duration-300" // 保持背景模糊
            onClick={closeDesktopDrawer}
            aria-hidden="true"
          ></div>
        )}

        {/* 抽屉内容 */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl transition-transform duration-300 ease-in-out rounded-t-lg ${ // 添加顶部圆角
            isDesktopDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* 限制最大高度并允许内部滚动 */}
          <div className="container mx-auto px-4 md:px-8 py-6 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">筛选项目</h2>
              <button onClick={closeDesktopDrawer} aria-label="关闭筛选" className="text-gray-500 hover:text-black p-1 rounded-full hover:bg-gray-100"> // 添加 hover 背景和圆角
                <X size={24} />
              </button>
            </div>
            <div className="space-y-0 pb-4"> // 移除 space-y-6，由 FilterSection 控制间距
              <FilterSection title="行业" items={industries} selectedItems={filters.industries} onToggle={toggleIndustry} />
              <FilterSection title="类型" items={types} selectedItems={filters.types} onToggle={toggleType} />
              <FilterSection title="项目规模" items={projectSizes} selectedItems={filters.projectSizes} onToggle={toggleProjectSize} />
              {hasActiveFilters && (
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      clearFilters();
                    }}
                    className="w-full text-center text-sm text-red-500 hover:text-red-700 transition-colors py-2 rounded-full hover:bg-red-50" // 改为胶囊按钮样式，用红色表示清除
                  >
                    清除所有筛选
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- 移动端筛选 (FAB + Modal - 保持不变) --- */}
      <button
        onClick={toggleFilterModal}
        className="md:hidden fixed bottom-8 left-6 z-40 bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="打开筛选"
      >
        <Filter size={24} />
      </button>
      <div
        className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
          isFilterModalOpen ? 'translate-y-0' : 'translate-y-full'
        } bg-white/80 backdrop-blur-2xl`}
      >
         <div className="container mx-auto px-4 py-6 relative z-50 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-medium">筛选项目</h2>
              <button onClick={toggleFilterModal} aria-label="关闭筛选" className="text-gray-500 hover:text-black">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-6 pb-20">
              <FilterSection title="Industry" items={industries} selectedItems={filters.industries} onToggle={toggleIndustry} />
              <FilterSection title="Type" items={types} selectedItems={filters.types} onToggle={toggleType} />
              <FilterSection title="Project Size" items={projectSizes} selectedItems={filters.projectSizes} onToggle={toggleProjectSize} />
              {hasActiveFilters && (
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      clearFilters();
                    }}
                    className="w-full text-center text-sm text-gray-500 hover:text-black transition-colors py-2"
                  >
                    清除所有筛选
                  </button>
                </div>
              )}
            </div>
         </div>
      </div>
    </>
  );
};

export default FilterSystem;
