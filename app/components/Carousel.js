"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Innovation Redefined",
      subtitle: "Experience the Future",
      description:
        "Discover groundbreaking technology that transforms the way you work, create, and connect with the world around you.",
      image: "/carousel/1.jpg",
      buttonText: "Learn More",
    },
    {
      id: 2,
      title: "Design Excellence",
      subtitle: "Crafted to Perfection",
      description:
        "Every detail meticulously designed to deliver an unparalleled experience that seamlessly integrates into your lifestyle.",
      image: "/carousel/2.jpg",
      buttonText: "Explore",
    },
    {
      id: 3,
      title: "Sustainable Future",
      subtitle: "For Our Planet",
      description:
        "Leading the industry with environmentally conscious practices and sustainable innovations for generations to come.",
      image: "/carousel/3.jpg",
      buttonText: "Join Us",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative flex-shrink-0 w-full h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 sm:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                {/* Subtitle */}
                <div
                  className={`text-white/80 text-sm sm:text-base font-medium mb-4 transition-all duration-1000 delay-300 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {slide.subtitle}
                </div>

                {/* Title */}
                <h1
                  className={`text-white text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight transition-all duration-1000 delay-500 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {slide.title}
                </h1>

                {/* Description */}
                <p
                  className={`text-white/90 text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {slide.description}
                </p>

                {/* CTA Button */}
                <div
                  className={`transition-all duration-1000 delay-1000 ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-6 right-6 z-20 flex items-center space-x-2">
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isAutoPlay ? "bg-green-400 animate-pulse" : "bg-red-400"
          }`}
        />
        <span className="text-white/70 text-xs hidden sm:inline">
          {isAutoPlay ? "Auto" : "Manual"}
        </span>
      </div>
    </div>
  );
}
