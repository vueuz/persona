import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    projectType: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 在实际应用中，您需要处理表单提交到后端
    console.log('表单已提交:', formData);

    // 显示成功消息
    setSubmitted(true);

    // 5秒后重置表单
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        projectType: '',
      });
      setSubmitted(false);
    }, 5000);
  };

  const projectTypes = [
    '品牌识别',
    '演示设计',
    '数字体验',
    '包装设计',
    '环境设计',
    '印刷设计',
    '动态图形',
    '其他',
  ];

  return (
    <main>
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">联系我们</h1>
            <p className="text-xl text-gray-600">
              让我们讨论如何通过卓越的设计帮助您将愿景变为现实。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-6">联系信息</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">邮箱</h3>
                  <p className="text-lg">yung.venue@gmail.com</p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm mb-1">电话</h3>
                  <p className="text-lg">+86 15669657703</p>
                </div>

                {/* <div>
                  <h3 className="text-gray-500 text-sm mb-1">办公室</h3>
                  <p className="text-lg">设计大街 123 号<br />创意区<br />纽约, NY 10001</p>
                </div> */}

                <div>
                  <h3 className="text-gray-500 text-sm mb-1">工作时间</h3>
                  <p className="text-lg">每天: 9am-6pm</p>
                </div>
              </div>

              {/* <div className="mt-12">
                <h3 className="text-lg font-medium mb-4">关注我们</h3>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">Instagram</a>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">Dribbble</a>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">Behance</a>
                  <a href="#" className="text-gray-600 hover:text-black transition-colors">LinkedIn</a>
                </div>
              </div> */}
            </div>

            <div>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"> {/* 保持圆角 */}
                  <h3 className="text-xl font-bold text-green-800 mb-2">消息已发送！</h3>
                  <p className="text-green-700">
                    感谢您的联系。我们将在 1-2 个工作日内回复您。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      该怎么称呼您 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-md" // 添加圆角
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      邮箱/微信 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-md" // 添加圆角
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      公司
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-md" // 添加圆角
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                      项目类型
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-md" // 添加圆角
                    >
                      <option value="">选择项目类型</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      您的诉求 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-md" // 添加圆角
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors rounded-full" // 改为胶囊按钮
                    >
                      发送
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
