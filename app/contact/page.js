"use client";

import React, { useState, useEffect, useRef } from "react";

// Modal Component
const Modal = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  const getModalStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: "✅",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          iconColor: "text-green-600",
          titleColor: "text-green-800",
        };
      case "error":
        return {
          icon: "❌",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          iconColor: "text-red-600",
          titleColor: "text-red-800",
        };
      default:
        return {
          icon: "ℹ️",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          iconColor: "text-blue-600",
          titleColor: "text-blue-800",
        };
    }
  };

  const styles = getModalStyles();

  return (
    <div className="fixed inset-0 bg-gray-400/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all">
        <div
          className={`p-6 rounded-t-2xl ${styles.bgColor} ${styles.borderColor} border-b`}
        >
          <div className="flex items-center space-x-3">
            <div className={`text-2xl ${styles.iconColor}`}>{styles.icon}</div>
            <h3 className={`text-lg font-semibold ${styles.titleColor}`}>
              {title}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            {message}
          </p>

          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRefs = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const showModal = (type, title, message) => {
    setModal({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: "info",
      title: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      id: 1,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "hello@peach.com",
      icon: "✉️",
      link: "mailto:hello@peach.com",
    },
    {
      id: 2,
      title: "Call Us",
      description: "Mon-Fri 9AM-6PM (GMT+7)",
      value: "+66 92 248 8960",
      icon: "📞",
      link: "tel:+66922488960",
    },
    {
      id: 3,
      title: "Visit Us",
      description: "Come say hello",
      value: "Chiang Mai, Thailand",
      icon: "📍",
      link: "#",
    },
    {
      id: 4,
      title: "Live Chat",
      description: "Chat with our team",
      value: "Available 24/7",
      icon: "💬",
      link: "#",
    },
  ];

  const serviceOptions = [
    "UI/UX Design",
    "Web Development",
    "App Development",
    "Digital Consulting",
    "Support & Maintenance",
    "Data Analytics",
    "Other",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "กรุณากรอกชื่อของคุณ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "กรุณากรอกอีเมลที่ถูกต้อง";
    }

    if (!formData.message.trim()) {
      newErrors.message = "กรุณากรอกข้อความ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showModal(
        "success",
        "ส่งข้อความสำเร็จ!",
        "ขอบคุณสำหรับการติดต่อ เราจะตอบกลับคุณภายใน 24 ชั่วโมง"
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (error) {
      showModal(
        "error",
        "เกิดข้อผิดพลาด",
        "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง หรือติดต่อเราโดยตรง"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
            Get In Touch
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            Let's Talk
            <br />
            <span className="text-gray-500">About Your Project</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Ready to bring your ideas to life? We're here to help you create
            something amazing. Reach out and let's start the conversation.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              How to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the method that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={method.id}
                href={method.link}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-section-id={method.id}
                className={`block bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-700 transform border border-gray-100 group ${
                  visibleSections.includes(method.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {method.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {method.description}
                </p>

                <p className="text-black font-semibold group-hover:text-gray-700 transition-colors">
                  {method.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about your project and we'll get back to you within 24
              hours.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8 sm:p-12">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    ชื่อของคุณ *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="กรอกชื่อของคุณ"
                    className={`text-black w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                      errors.name
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black hover:border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    อีเมล *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className={`text-black w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black hover:border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone & Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="08X-XXX-XXXX"
                    className="text-black w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black hover:border-gray-300 transition-all duration-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    บริษัท/องค์กร
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="ชื่อบริษัทของคุณ"
                    className="text-black w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black hover:border-gray-300 transition-all duration-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  บริการที่สนใจ
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="text-black w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black hover:border-gray-300 transition-all duration-300 focus:outline-none bg-white"
                >
                  <option value="">เลือกบริการที่คุณสนใจ</option>
                  {serviceOptions.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  รายละเอียดโปรเจค *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="เล่าให้เราฟังเกี่ยวกับโปรเจคของคุณ..."
                  rows="6"
                  className={`text-black w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                    errors.message
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-black hover:border-gray-300"
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    กำลังส่งข้อความ...
                  </div>
                ) : (
                  "ส่งข้อความ"
                )}
              </button>

              {/* Privacy Notice */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  การส่งข้อความแสดงว่าคุณยอมรับ{" "}
                  <a
                    href="#"
                    className="text-black hover:underline font-medium"
                  >
                    นโยบายความเป็นส่วนตัว
                  </a>{" "}
                  ของเรา
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Frequently Asked
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary depending on scope and complexity. Simple websites typically take 2-4 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "Yes! We offer comprehensive support and maintenance packages to keep your digital products running smoothly. This includes bug fixes, security updates, and performance optimization.",
              },
              {
                question: "What's your design process like?",
                answer:
                  "We follow a collaborative design process that includes discovery, wireframing, visual design, and user testing. You'll be involved at every step to ensure the final product meets your vision.",
              },
              {
                question: "Can you work with our existing team?",
                answer:
                  "Absolutely! We're experienced in collaborating with in-house teams, agencies, and other vendors. We adapt our workflow to integrate seamlessly with your existing processes.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Quick Response Guaranteed
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We understand that time is valuable. That's why we commit to
              responding to all inquiries within 24 hours during business days.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { time: "< 2 hours", label: "Initial Response", icon: "⚡" },
                { time: "< 24 hours", label: "Detailed Proposal", icon: "📋" },
                { time: "< 48 hours", label: "Project Kickoff", icon: "🚀" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {item.time}
                  </div>
                  <div className="text-gray-600 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
