import React from 'react';
import { Link } from '../components/ui/Link';
import { caseStudies } from '../data/caseStudies';

const Gallery: React.FC = () => {
  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Study Gallery</h1>
          <p className="text-xl text-gray-600">
            Explore our complete collection of work, showcasing the breadth and depth of our design expertise across various industries and mediums.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              to={`/case-study/${study.id}`}
              className="group block"
            >
              {/* Changed aspect ratio from aspect-[4/3] to aspect-[16/9] */}
              <div className="relative aspect-[16/9] overflow-hidden mb-4">
                <img
                  src={study.thumbnailUrl}
                  alt={study.title}
                  // Removed group-hover:scale-105
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                {/* Removed hover overlay div */}
              </div>
              <h2 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition-colors">
                {study.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {study.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {study.type.map((type, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
