// Fix: Populating HeroSection.tsx with full component implementation.
import React, { useState, useEffect } from 'react';
import { MOCK_POSTS } from '../constants.ts';

const slides = MOCK_POSTS.filter(p => p.mediaUrl).map(p => ({
    image: p.mediaUrl!,
    caption: p.author.name,
    subcaption: p.content.substring(0, 50) + '...',
}));


const HeroSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex]);
    
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="w-full aspect-square md:aspect-[2/1] lg:aspect-[3/1] relative group rounded-lg overflow-hidden shadow-lg">
           <div className="w-full h-full relative">
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slideIndex}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                            slideIndex === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img src={slide.image} alt={`Slide ${slideIndex + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
                            <h3 className="font-bold text-lg">{slide.caption}</h3>
                            <p className="text-sm">{slide.subcaption}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, slideIndex) => (
                     <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            currentIndex === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                     />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;