import React, { useState } from 'react';
import FilterSystem from '../components/portfolio/FilterSystem';
import CaseGrid from '../components/portfolio/CaseGrid';
import { filterCaseStudies } from '../data/caseStudies';
import { FilterState, Industry, CaseType, ProjectSize } from '../types';

const Portfolio: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    industries: [],
    types: [],
    projectSizes: []
  });
  
  const filteredCaseStudies = filterCaseStudies(
    filters.industries as string[],
    filters.types as string[],
    filters.projectSizes as string[]
  );
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  return (
    <main>
      <section className="pt-32 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-gray-600 max-w-2xl">
            Explore our collection of work across various industries and design disciplines.
            Use the filters below to find relevant case studies.
          </p>
        </div>
      </section>
      
      <FilterSystem 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <CaseGrid caseStudies={filteredCaseStudies} />
    </main>
  );
};

export default Portfolio;