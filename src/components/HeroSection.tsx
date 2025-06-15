
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    title: "Bestsellers of the Month",
    subtitle: "Discover the most loved books by readers worldwide",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop",
    cta: "Shop Bestsellers"
  },
  {
    id: 2,
    title: "New Arrivals Collection",
    subtitle: "Fresh titles from your favorite authors and exciting new voices",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
    cta: "Explore New Books"
  },
  {
    id: 3,
    title: "Fiction & Literature",
    subtitle: "Immerse yourself in captivating stories and timeless classics",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=600&fit=crop",
    cta: "Browse Fiction"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden bg-bookworld-bg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl animate-fade-in">
                <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="font-inter text-lg md:text-xl mb-8 opacity-90">
                  {slide.subtitle}
                </p>
                <Button 
                  size="lg" 
                  className="bg-bookworld-accent hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
