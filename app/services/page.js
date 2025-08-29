"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Services() {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  const servicesData = [
    {
      id: 1,
      category: "Design",
      title: "UI/UX Design",
      description:
        "Creating beautiful, intuitive interfaces that users love. From wireframes to final designs.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
      ],
      icon: "🎨",
      price: "Starting at ฿25,000",
      duration: "2-4 weeks",
    },
    {
      id: 2,
      category: "Development",
      title: "Web Development",
      description:
        "Full-stack web applications built with modern technologies and best practices.",
      features: [
        "React/Next.js",
        "Backend APIs",
        "Database Design",
        "Deployment",
      ],
      icon: "💻",
      price: "Starting at ฿50,000",
      duration: "4-8 weeks",
    },
    {
      id: 3,
      category: "Mobile",
      title: "App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android.",
      features: [
        "iOS Development",
        "Android Development",
        "React Native",
        "App Store Launch",
      ],
      icon: "📱",
      price: "Starting at ฿80,000",
      duration: "6-12 weeks",
    },
    {
      id: 4,
      category: "Strategy",
      title: "Digital Consulting",
      description:
        "Strategic guidance to help your business thrive in the digital landscape.",
      features: [
        "Digital Strategy",
        "Technology Audit",
        "Growth Planning",
        "Team Training",
      ],
      icon: "📊",
      price: "Starting at ฿15,000",
      duration: "1-2 weeks",
    },
    {
      id: 5,
      category: "Maintenance",
      title: "Support & Maintenance",
      description:
        "Ongoing support to keep your digital products running smoothly and securely.",
      features: [
        "Bug Fixes",
        "Security Updates",
        "Performance Optimization",
        "24/7 Support",
      ],
      icon: "🛠️",
      price: "Starting at ฿8,000/month",
      duration: "Ongoing",
    },
    {
      id: 6,
      category: "Analytics",
      title: "Data Analytics",
      description:
        "Transform your data into actionable insights for better business decisions.",
      features: [
        "Data Visualization",
        "Custom Dashboards",
        "Reporting Systems",
        "AI Integration",
      ],
      icon: "📈",
      price: "Starting at ฿35,000",
      duration: "3-6 weeks",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description:
        "We begin by understanding your goals, challenges, and requirements.",
    },
    {
      step: "02",
      title: "Strategy",
      description:
        "Develop a comprehensive plan tailored to your specific needs.",
    },
    {
      step: "03",
      title: "Design & Build",
      description:
        "Create and develop your solution with attention to every detail.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description:
        "Deploy your project and provide ongoing support for success.",
    },
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = parseInt(entry.target.dataset.sectionId);
            setVisibleSections((prev) => [...new Set([...prev, sectionId])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
            Our Services
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            Crafted with
            <br />
            <span className="text-gray-500">Precision</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            We deliver exceptional digital experiences through thoughtful
            design, cutting-edge technology, and meticulous attention to detail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105">
              Start Your Project
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-full font-semibold hover:border-black hover:bg-gray-50 transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-section-id={service.id}
                className={`bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-700 transform border border-gray-100 ${
                  visibleSections.includes(service.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-6">{service.icon}</div>

                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 mb-4">
                  {service.category}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-black rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {service.price}
                    </span>
                    <span className="text-sm text-gray-600">
                      {service.duration}
                    </span>
                  </div>

                  <button className="w-full px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
              Our Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A proven methodology that ensures every project delivers
              exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="text-center group"
                ref={(el) =>
                  (sectionRefs.current[servicesData.length + index] = el)
                }
                data-section-id={100 + index}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full text-xl font-bold mb-6 transform transition-all duration-700 ${
                    visibleSections.includes(100 + index)
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {step.step}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <div className="w-12 h-px bg-gray-300 mx-auto"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "200+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
              { number: "99%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Ready to Start?
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Let's discuss your project and bring your vision to life. We're here
            to help you succeed.
          </p>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 max-w-2xl mx-auto">
            <div className="p-8 sm:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300"
                />
              </div>

              <textarea
                placeholder="Tell us about your project..."
                rows="4"
                className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300 mb-6 resize-none"
              ></textarea>

              <button className="w-full px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02]">
                Send Message
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Or reach us directly at{" "}
              <a
                href="mailto:hello@peach.com"
                className="text-black hover:underline font-medium"
              >
                hello@peach.com
              </a>{" "}
              or{" "}
              <a
                href="tel:+66922488960"
                className="text-black hover:underline font-medium"
              >
                +66 92 248 8960
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
