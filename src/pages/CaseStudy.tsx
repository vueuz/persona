import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '../components/ui/Link';
import { getCaseStudyById, caseStudies } from '../data/caseStudies';
import { CaseStudy as CaseStudyType } from '../types';

interface CaseStudyProps {
  id?: string;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ id = '1' }) => {
  const [caseStudy, setCaseStudy] = useState<CaseStudyType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [nextCaseId, setNextCaseId] = useState<string | null>(null);
  const [prevCaseId, setPrevCaseId] = useState<string | null>(null);

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
        <div className="animate-pulse">Loading case study...</div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen pt-32 container mx-auto px-4 md:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case study not found</h1>
          <p className="mb-8">The case study you're looking for doesn't exist or has been removed.</p>
          <Link to="/portfolio" className="inline-block bg-black text-white px-6 py-3">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={caseStudy.heroImageUrl}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <Link to="/portfolio" className="inline-flex items-center text-white mb-8 hover:underline">
              <ArrowLeft size={16} className="mr-2" />
              Back to Portfolio
            </Link>

            <div className="max-w-2xl text-white">
              <span className="block text-sm uppercase tracking-wider mb-2">{caseStudy.client}</span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{caseStudy.title}</h1>

              <div className="flex flex-wrap gap-2 mb-8">
                {caseStudy.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
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
                      className="w-full h-auto"
                    />
                  )}
                </div>
              ))}
            </div>

            <div>
              <div className="bg-gray-50 p-8 sticky top-32">
                <h3 className="text-xl font-bold mb-6">Project Details</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Client</h4>
                    <p>{caseStudy.client}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Industry</h4>
                    <p>{caseStudy.industry}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Project Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.type.map((type, index) => (
                        <span key={index} className="text-sm">
                          {type}{index < caseStudy.type.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Project Size</h4>
                    <p>{caseStudy.projectSize}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Year</h4>
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
          <h2 className="text-2xl font-bold mb-12">Project Gallery</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
            {caseStudy.images.map((image, index) => (
              <div key={index} className="overflow-hidden shadow-sm">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105 "
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation to Other Case Studies */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            {prevCaseId && (
              <Link to={`/case-study/${prevCaseId}`} className="group mb-8 md:mb-0">
                <div className="flex items-center text-gray-500 mb-2 group-hover:text-black transition-colors">
                  <ChevronLeft size={16} className="mr-1" />
                  <span>Previous Case</span>
                </div>
                <span className="text-xl font-medium group-hover:underline">
                  {getCaseStudyById(prevCaseId)?.title}
                </span>
              </Link>
            )}

            {nextCaseId && (
              <Link to={`/case-study/${nextCaseId}`} className="group text-right">
                <div className="flex items-center justify-end text-gray-500 mb-2 group-hover:text-black transition-colors">
                  <span>Next Case</span>
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
