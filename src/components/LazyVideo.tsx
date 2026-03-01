import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Loader2 } from 'lucide-react';

interface LazyVideoProps {
  videoUrl: string;
  posterUrl: string;
  title?: string;
}

export const LazyVideo: React.FC<LazyVideoProps> = ({ videoUrl, posterUrl, title = "Product Video" }) => {
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden glass group shadow-2xl"
      id="product-video"
    >
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-pointer"
            onClick={handlePlay}
          >
            <img 
              src={posterUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-brand rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                <Play className="text-black w-8 h-8 fill-black" />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black"
          >
            {isInView && (
              <>
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-brand animate-spin" />
                  </div>
                )}
                <iframe
                  src={`${videoUrl}?autoplay=1&rel=0`}
                  title={title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setIsLoaded(true)}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
