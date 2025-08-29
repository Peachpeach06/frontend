"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function About() {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  // Education data
  const education = [
    {
      id: 1,
      degree: "Information Technology",
      institution: "Chiang Mai Technical College",
      year: "2024",
      description: "Specialized in Web Development and Network Systems.",
      icon: "🎓",
    },
  ];

  // Skills data
  const skills = [
    { name: "React & Next.js", level: 95, color: "bg-blue-500" },
    { name: "Node.js", level: 90, color: "bg-green-500" },
    { name: "UI/UX Design", level: 85, color: "bg-purple-500" },
    { name: "TypeScript", level: 88, color: "bg-indigo-500" },
    { name: "Database Design", level: 82, color: "bg-orange-500" },
    { name: "Mobile Development", level: 75, color: "bg-pink-500" },
  ];

  // Stats data
  const stats = [
    { number: "2+", label: "Projects Completed", icon: "🚀" },
    { number: "3+", label: "Years Experience", icon: "⏱️" },
    { number: "20+", label: "Happy Clients", icon: "😊" },
    { number: "5", label: "Technologies Mastered", icon: "⚡" },
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
        rootMargin: "0px 0px -50px 0px",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
                About Me
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                สวัสดี,
                <br />
                <span className="text-gray-500">
                  I'm Khanathip Thandee (พีท)
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                นักพัฒนาเว็บและนักออกแบบ UI/UX
                ที่มีความหลงใหลในการสร้างประสบการณ์ดิจิทัลที่น่าประทับใจ
                และมีประสิทธิภาพ ด้วยประสบการณ์มากกว่า 3
                ปีในการพัฒนาเว็บแอปพลิเคชันและการออกแบบ
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get In Touch
                </a>
                <a
                  href="#education"
                  className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>

{/* Right side - Photo */}
<div className="flex justify-center lg:justify-end">
  <div className="relative">
    <div className="w-80 h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl shadow-xl overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src="/peach.jpg" // ใส่ path ของรูป
          alt="Profile"
          width={320}
          height={320}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
    {/* Decorative elements */}
    <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20"></div>
    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-full opacity-20"></div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-section-id={index + 1}
                className={`text-center transform transition-all duration-700 ${
                  visibleSections.includes(index + 1)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              การศึกษา
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              เส้นทางการเรียนรู้และพัฒนาทักษะในด้านเทคโนโลยี
            </p>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                ref={(el) => (sectionRefs.current[index + 10] = el)}
                data-section-id={edu.id + 10}
                className={`bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transform transition-all duration-700 ${
                  visibleSections.includes(edu.id + 10)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="text-5xl">{edu.icon}</div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
                        {edu.degree}
                      </h3>
                      <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {edu.year}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-700 mb-3">
                      {edu.institution}
                    </h4>

                    <p className="text-gray-600 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              ทักษะและความเชี่ยวชาญ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              เทคโนโลยีและเครื่องมือที่ใช้ในการสร้างสรรค์ผลงาน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index + 20] = el)}
                data-section-id={index + 20}
                className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform transition-all duration-700 ${
                  visibleSections.includes(index + 20)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {skill.name}
                  </h3>
                  <span className="text-sm font-medium text-gray-600">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                    style={{
                      width: visibleSections.includes(index + 20)
                        ? `${skill.level}%`
                        : "0%",
                      transitionDelay: `${index * 200 + 500}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
            แนวคิดในการทำงาน
          </h2>

          <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
            <blockquote className="text-2xl font-medium text-gray-900 italic mb-6">
              "การออกแบบที่ดีไม่ใช่แค่การทำให้สวยงาม
              แต่เป็นการแก้ปัญหาและสร้างประสบการณ์ที่มีความหมาย"
            </blockquote>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              ฉันเชื่อว่าเทคโนโลยีควรทำให้ชีวิตของผู้คนง่ายขึ้น
              ทุกโปรเจคที่ฉันทำจึงเริ่มต้นด้วยการทำความเข้าใจ
              ความต้องการของผู้ใช้อย่างลึกซึ้ง
              และสร้างสรรค์โซลูชันที่ไม่เพียงแค่ตอบโจทย์ แต่ยังสร้างความประทับใจ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "User-Centered",
                  description: "ใส่ใจผู้ใช้เป็นอันดับแรก",
                  icon: "👥",
                },
                {
                  title: "Clean Code",
                  description: "เขียนโค้ดที่สะอาดและบำรุงรักษาง่าย",
                  icon: "💻",
                },
                {
                  title: "Continuous Learning",
                  description: "เรียนรู้เทคโนโลยีใหม่อย่างต่อเนื่อง",
                  icon: "📚",
                },
              ].map((principle, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{principle.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            มาสร้างสิ่งที่ยอดเยี่ยมด้วยกัน
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            หากคุณมีไอเดียหรือโปรเจคที่น่าสนใจ อยากพูดคุยเกี่ยวกับเทคโนโลยี
            หรือแค่อยากทักทายสักหน่อย ยินดีต้อนรับเสมอ!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              ติดต่อฉัน
            </a>
            <a
              href="mailto:peach@example.com"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              ส่งอีเมล
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
