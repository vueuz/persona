import React from 'react';
import { Link } from '../ui/Link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="font-bold text-xl tracking-tight mb-4 inline-block">
              VOFI Design Studio
            </Link>
            <p className="text-gray-600 mt-2 text-sm">
              Creating visual narratives for forward-thinking brands since 2022.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <p className="text-gray-600 text-sm">yung.venue@gmail.com</p>
            <p className="text-gray-600 text-sm mt-1">+86 156-6965-7703</p>
          </div>

          <div>
            {/* <h4 className="font-medium mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Link to="https://instagram.com" className="text-gray-600 hover:text-black transition-colors">
                Instagram
              </Link>
              <Link to="https://dribbble.com" className="text-gray-600 hover:text-black transition-colors">
                Dribbble
              </Link>
              <Link to="https://behance.net" className="text-gray-600 hover:text-black transition-colors">
                Behance
              </Link>
            </div> */}
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} VOFI Design Studio. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-black transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
