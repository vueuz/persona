import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';

const ContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: ''
  });

  const toggleContactForm = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('表单已提交:', formData); // 修改日志文字
    setFormData({ name: '', email: '', inquiry: '' });
    setIsOpen(false);
    alert('感谢您的联系！我们会尽快回复您。'); // 修改提示文字
  };

  return (
    <>
      {/* 联系按钮 */}
      <button
        onClick={toggleContactForm}
        className={`fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${ // 调整大小以适应胶囊形状
          isOpen ? 'bg-black text-white' : 'bg-white text-black'
        }`}
        aria-label="联系我们" // 修改 aria-label
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* 联系表单面板 */}
      <div
        className={`fixed bottom-0 right-0 z-30 w-full sm:w-96 bg-white shadow-xl transition-transform duration-300 ease-in-out transform rounded-t-lg ${ // 添加顶部圆角
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="p-6">
          <h3 className="text-xl font-medium mb-6">联系我们</h3>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  称呼
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" // 添加圆角
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱/微信
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" // 添加圆角
                />
              </div>

              <div>
                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">
                  我们能帮您什么？
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" // 添加圆角
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors" // 改为胶囊按钮
                >
                  发送消息
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-700 mb-2">快速咨询</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="border border-gray-300 px-3 py-2 text-sm rounded-full hover:bg-gray-100 transition-colors">
                品牌设计
              </button>
              <button className="border border-gray-300 px-3 py-2 text-sm rounded-full hover:bg-gray-100 transition-colors">
                演示设计
              </button>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactButton;
