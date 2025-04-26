import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from '../ui/Link';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 菜单开关逻辑
  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : '';
      return !prev;
    });
  };

  return (
    <>
      {/* 主顶栏 */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isScrolled ? 'h-16 shadow-sm' : 'h-20'}
        bg-white/80 backdrop-blur-2xl border-b border-white/20 `}>

        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold tracking-tighter text-black/90">
            VOFI Studio
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 text-sm text-black/80">
              <Link to="/portfolio" className="hover:text-black/60 transition-colors">作品集</Link>
              <Link to="/about" className="hover:text-black/60 transition-colors">关于我们</Link>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 text-sm transition-colors" // 改为胶囊按钮，调整 padding
            >
              联系我们
            </Link>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 -mr-2 text-black/80 hover:text-black/60 transition-colors"
            aria-label="切换菜单" // 修改 aria-label
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* 移动端菜单覆盖层 */}
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* 背景遮罩 */}
        <div
          className={`absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-500
            ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={toggleMenu}
        />

        {/* 菜单内容 */}
        <div
          className={`relative h-full w-full ml-auto bg-white/80 backdrop-blur-2xl
            transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* 菜单头部 */}
          <div className="p-6 flex justify-between items-center border-b border-white/20">
             <Link onClick={toggleMenu} to="/" className="text-xl font-semibold tracking-tighter text-black/90">
              VOFI Studio
             </Link>
            <button
              onClick={toggleMenu}
              className="p-2 -mr-2 text-black/80 hover:text-black/60 transition-colors"
              aria-label="关闭菜单" // 修改 aria-label
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-4 text-lg">
            <Link to="/portfolio" className="py-3 hover:text-black/60 transition-colors" onClick={toggleMenu}>
              作品集
            </Link>

            <Link to="/about" className="py-3 hover:text-black/60 transition-colors" onClick={toggleMenu}>
              关于我们
            </Link>
            <Link
              to="/contact"
              className="mt-4 inline-block text-center px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors" // 改为胶囊按钮，调整 padding 和 display
              onClick={toggleMenu}
            >
              联系我们
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
