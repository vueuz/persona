import React from 'react';
import { Link } from '../components/ui/Link'; // 引入 Link 组件
import { ArrowUpRight } from 'lucide-react'; // 引入图标

const About: React.FC = () => {
  return (
    <main>
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              一家专注于创造有意义的视觉叙事的设计工作室，旨在重塑品牌并吸引受众。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">我们的理念</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                我们相信，伟大的设计诞生于目标、美学和功能的交汇点。我们的方法将战略思维与视觉工艺相结合，交付的作品不仅外观出众，而且服务于明确的商业目标。
              </p>
              <p className="text-gray-700 leading-relaxed">
                我们的工作室建立在视觉叙事是与受众建立联系的最有力方式这一原则之上。我们运用空间思维创造沉浸式体验，将品牌提升至超乎预期的水平。
              </p>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="我们的工作室空间"
                className="w-full h-auto rounded-lg" // 图片添加圆角
              />
              <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-black text-white p-4 md:p-6 rounded-lg"> {/* 色块添加圆角并调整位置 */}
                <p className="text-sm">成立于 2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          {/* 统计数据部分保持文本居中，不添加背景色块 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-gray-400">服务品牌</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-gray-400">项目交付</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">15+</p>
              <p className="text-gray-400">服务行业</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">3</p>
              <p className="text-gray-400">设计奖项</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">我们的团队</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img
                src="https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="团队成员"
                className="w-full aspect-[3/4] object-cover mb-4 rounded-lg" // 图片添加圆角
              />
              <h3 className="text-xl font-bold mb-1">莎拉·约翰逊</h3>
              <p className="text-gray-600 mb-2">创意总监</p>
              <p className="text-gray-700 text-sm">
                凭借超过 15 年的品牌设计经验，莎拉引领着我们的创意方向。
              </p>
            </div>

            <div>
              <img
                src="https://images.pexels.com/photos/5082976/pexels-photo-5082976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="团队成员"
                className="w-full aspect-[3/4] object-cover mb-4 rounded-lg" // 图片添加圆角
              />
              <h3 className="text-xl font-bold mb-1">迈克尔·陈</h3>
              <p className="text-gray-600 mb-2">设计主管</p>
              <p className="text-gray-700 text-sm">
                迈克尔专注于数字体验和交互式设计系统。
              </p>
            </div>

            <div>
              <img
                src="https://images.pexels.com/photos/8101622/pexels-photo-8101622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="团队成员"
                className="w-full aspect-[3/4] object-cover mb-4 rounded-lg" // 图片添加圆角
              />
              <h3 className="text-xl font-bold mb-1">艾玛·罗德里格斯</h3>
              <p className="text-gray-600 mb-2">策略总监</p>
              <p className="text-gray-700 text-sm">
                艾玛确保我们的设计工作符合业务目标和品牌战略。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">我们的流程</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 rounded-lg"> {/* 色块添加圆角 */}
                01
              </div>
              <h3 className="text-xl font-bold mb-4">探索</h3>
              <p className="text-gray-700">
                我们首先了解您的业务、受众和目标，以建立战略基础。
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 rounded-lg"> {/* 色块添加圆角 */}
                02
              </div>
              <h3 className="text-xl font-bold mb-4">创造</h3>
              <p className="text-gray-700">
                我们的设计团队打造符合战略并突破创意界限的视觉解决方案。
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 rounded-lg"> {/* 色块添加圆角 */}
                03
              </div>
              <h3 className="text-xl font-bold mb-4">交付</h3>
              <p className="text-gray-700">
                我们完善并最终确定设计，确保其符合目标并以所有所需格式交付。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">准备好合作了吗？</h2>
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
    </main>
  );
};

export default About;
