import React from 'react';
import { CaseStudy } from '../../types';
import { Link } from '../ui/Link';

interface CaseGridProps {
  caseStudies: CaseStudy[];
}

const CaseGrid: React.FC<CaseGridProps> = ({ caseStudies }) => {
  if (caseStudies.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500 text-lg">No case studies match your current filters.</p>
        <p className="text-gray-400 mt-2">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {caseStudies.map((caseStudy) => (
            <Link key={caseStudy.id} to={`/case-study/${caseStudy.id}`}>
              <div className="group">
                <div className="relative overflow-hidden aspect-[16/9] mb-4 shadow-lg">
                  <img
                    src={caseStudy.thumbnailUrl}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">{caseStudy.client}</span>
                    <span className="text-gray-400 text-sm">{caseStudy.year}</span>
                  </div>
                  <h3 className="text-xl font-medium transition-colors group-hover:text-gray-700">
                    {caseStudy.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {caseStudy.type.map((type, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseGrid;
