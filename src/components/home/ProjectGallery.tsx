import React, { useRef, useState, useEffect, useCallback } from 'react';



interface ProjectGalleryProps {
  images: string[];
}

const AUTOPLAY_INTERVAL_MS = 5000; // Define interval duration as a constant

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Key to force re-render/reset animation on the progress bar
  const [progressKey, setProgressKey] = useState(0);

  const getItemWidth = useCallback((): number => {
    return containerRef.current ? containerRef.current.offsetWidth / 3 : 0;
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current && images.length > 0) {
      const targetIndex = Math.max(0, Math.min(index, images.length - 1));
      const container = containerRef.current;
      const itemWidth = getItemWidth();

      if (itemWidth > 0) {
        const scrollLeft = targetIndex * itemWidth;
        isProgrammaticScroll.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });

        // Update index immediately *if* it changed
        setActiveIndex(prev => {
          if (prev !== targetIndex) {
             setProgressKey(prevKey => prevKey + 1); // Reset progress animation on index change
             return targetIndex;
          }
          return prev;
        });

        scrollTimeoutRef.current = setTimeout(() => {
           isProgrammaticScroll.current = false;
        }, 600);
      }
    }
  }, [images.length, getItemWidth]);


  const stopAutoPlay = useCallback((resetProgress = true) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsPlaying(false);
      if(resetProgress) {
        setProgressKey(prevKey => prevKey + 1); // Reset progress bar on stop
      }
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay(false); // Stop existing, but don't reset progress yet
    if (images.length > 1) {
      setIsPlaying(true);
      setProgressKey(prevKey => prevKey + 1); // Start progress animation
      intervalRef.current = setInterval(() => {
        setActiveIndex(prev => {
            const nextIndex = (prev + 1) % images.length;
            // Reset progress animation key *before* scrolling to next
            setProgressKey(prevKey => prevKey + 1);
            scrollToIndex(nextIndex);
            return nextIndex;
        });
      }, AUTOPLAY_INTERVAL_MS);
    }
  }, [images.length, stopAutoPlay, scrollToIndex]);


  const handleScroll = useCallback(() => {
     // Debounce scroll end detection or simply stop autoplay on any manual scroll start
    const manualScrollDetected = !isProgrammaticScroll.current;

    if (manualScrollDetected) {
        stopAutoPlay(); // Stop autoplay if user manually scrolls
        // Clear programmatic scroll flag potentially stuck by interruption
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        isProgrammaticScroll.current = false;
    } else {
        // If it's programmatic, just return for now, let timeout handle the flag
         if (scrollTimeoutRef.current) { // Check if programmatic scroll is finishing
             // Allow timeout to reset the flag
         } else {
             isProgrammaticScroll.current = false; // Reset if timeout cleared somehow
         }
        // return; // Don't process index calc during programmatic scroll (optional)
    }


    if (containerRef.current) {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const itemWidth = getItemWidth();

      if (itemWidth > 0) {
        const calculatedIndex = Math.round(scrollLeft / itemWidth);
        const newIndex = Math.max(0, Math.min(images.length - 1, calculatedIndex));

        // Update index only if changed and not during programmatic scroll end phase?
        // This logic can get tricky, main goal is for the final resting index to be correct.
         setActiveIndex(prev => {
             if (prev !== newIndex) {
                 // If index changed via manual scroll, ensure progress resets
                 if(manualScrollDetected) setProgressKey(k => k + 1);
                 return newIndex;
             }
             return prev;
         });
      }
    }

  }, [images.length, getItemWidth, stopAutoPlay]);

  // --- Effect for cleanup ---
  useEffect(() => {
    return () => {
        stopAutoPlay();
         if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [stopAutoPlay]);

  const handlePrev = () => {
    stopAutoPlay();
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    scrollToIndex(prevIndex);
  };

  const handleNext = () => {
    stopAutoPlay();
    const nextIndex = (activeIndex + 1) % images.length;
    scrollToIndex(nextIndex);
  };

  const handleDotClick = (index: number) => {
    stopAutoPlay();
    scrollToIndex(index);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  };

  const Placeholder = () => (
     <div
      className="flex-shrink-0 w-[calc(100%/3)] h-full p-2"
      aria-hidden="true"
    />
  );

  return (
    <div className="absolute left-0 w-full ">
      <div className="relative w-screen">
        {/* Scroll Container */}
        <div
          ref={containerRef}
          // Use snap-center on the container as well for better overall behavior (optional but recommended)
          className="snap-x snap-mandatory overflow-x-scroll flex h-[400px] scrollbar-hide"
          onScroll={handleScroll}
        >
          <Placeholder />
          {images.map((img, index) => (
            <div
              key={index}
              // *** CHANGE: Use snap-center for items ***
              className="snap-center flex-shrink-0 w-[calc(100%/3)] h-full p-2" // Snap center, fixed width, internal padding
            >
              <div className="h-full overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ">
                <img
                  src={img}
                  alt={`Project ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
          <Placeholder />
        </div>

        {/* Navigation Controls */}
        {/* Position adjusted slightly - e.g., bottom-4 */}
        <div className="absolute bottom-[-98px] left-1/2 -translate-x-1/2 flex bg-red  items-center space-x-4 rounded-full px-6 py-2 shadow-md">
          <button
            onClick={handlePrev}
            disabled={images.length <= 1}
            className="text-red hover:text-gray-500 disabled:opacity-50 transition-opacity"
            aria-label="Previous image"
          >
            ←
          </button>

          {/* Indicator Dots Area */}
          <div className="flex items-center space-x-4 p-4" role="tablist" aria-label="Image progress">
            {images.map((_, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`relative h-2.5 rounded-full transition-all duration-300 ease-out
                    ${ isActive ? 'w-[40px] bg-gray-500' : 'w-2.5 bg-gray-500 hover:bg-green/75' }
                  `} // Dynamic width and base background
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to image ${index + 1}`}
                >
                  {/* Progress Bar Element */}
                  {isActive && ( // Render progress bar only for the active indicator
                    <div
                       key={progressKey} // Force re-render to reset animation
                       className={`absolute inset-0 rounded-full bg-gray-900 origin-left
                        ${ isPlaying ? 'animate-fill-progress' : '' }
                       `} // Apply animation only when playing
                       style={{ animationDuration: `${AUTOPLAY_INTERVAL_MS}ms` }} // Sync duration
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={images.length <= 1}
            className="text-blue-600 hover:text-gray-300 disabled:opacity-50 transition-opacity"
            aria-label="Next image"
          >
            →
          </button>

          <button
            onClick={handlePlayToggle}
            disabled={images.length <= 1}
            className="text-red ml-4 disabled:opacity-50 transition-opacity"
            aria-label={isPlaying ? 'Pause automatic scrolling' : 'Start automatic scrolling'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
