"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Cards() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  const cardsData = [
    {
      id: 1,
      category: "Technology",
      title: "Next-Gen Processing",
      description: "Revolutionary performance meets incredible efficiency in our latest chip architecture.",
      image: "/cards/1.jpg",
      badge: "New",
      link: "#"
    },
    {
      id: 2,
      category: "Design",
      title: "Minimalist Excellence",
      description: "Every element carefully crafted to deliver beauty through simplicity and precision.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      badge: "Featured",
      link: "#"
    },
    {
      id: 3,
      category: "Innovation",
      title: "Sustainable Materials",
      description: "Pioneering eco-friendly materials that don't compromise on quality or durability.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      badge: "Eco",
      link: "#"
    },
    {
      id: 4,
      category: "Experience",
      title: "Seamless Integration",
      description: "Effortlessly connect and sync across all your devices for a unified experience.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      badge: "Popular",
      link: "#"
    },
    {
      id: 5,
      category: "Performance",
      title: "Lightning Fast",
      description: "Experience unprecedented speed and responsiveness in everything you do.",
      image: "/cards/2.jpg",
      badge: "Pro",
      link: "#"
    },
    {
      id: 6,
      category: "Security",
      title: "Advanced Protection",
      description: "Industry-leading security features to keep your data safe and private.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      badge: "Secure",
      link: "#"
    }
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "New": return "bg-green-500";
      case "Featured": return "bg-blue-500";
      case "Eco": return "bg-emerald-500";
      case "Popular": return "bg-orange-500";
      case "Pro": return "bg-purple-500";
      case "Secure": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.dataset.cardId);
            setVisibleCards(prev => [...new Set([...prev, cardId])]);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-4">
            Explore Our Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Designed for Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the innovative features and cutting-edge technology that make our products exceptional.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={el => cardRefs.current[index] = el}
              data-card-id={card.id}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform ${
                visibleCards.includes(card.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Card Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                </div>
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 ${getBadgeColor(card.badge)} text-white text-xs font-semibold rounded-full`}>
                  {card.badge}
                </div>

                {/* Category */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium rounded-full">
                  {card.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* CTA Link */}
                <a 
                  href={card.link}
                  className="inline-flex items-center text-black font-semibold hover:text-gray-700 transition-colors duration-300 group"
                >
                  Learn More
                  <svg 
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gray-200 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg">
              View All Products
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-full font-semibold hover:border-black hover:bg-gray-50 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10M+", label: "Users Worldwide" },
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "150+", label: "Countries Served" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}