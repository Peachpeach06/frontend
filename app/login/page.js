"use client";

import React, { useState , useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function Login() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/users");
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    }

    if (!formData.password) {
      newErrors.password = "กรุณากรอกรหัสผ่าน";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://food-backend-three-topaz.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        // Show success modal
        showModal(
          "success",
          "เข้าสู่ระบบสำเร็จ!",
          "ยินดีต้อนรับกลับมา คุณจะถูกนำไปยังหน้าหลักในอีกสักครู่"
        );

        // Reset form
        setFormData({
          username: "",
          password: "",
        });

        // You can redirect here after successful login
        setTimeout(() => {
          window.location.href = "/admin/users";
        }, 2000);
      } else {
        const error = await response.json();
        showModal(
          "error",
          "เข้าสู่ระบบไม่สำเร็จ",
          error.message ||
            "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showModal(
        "error",
        "เกิดข้อผิดพลาดในการเชื่อมต่อ",
        "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตและลองใหม่อีกครั้ง"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Login</span>
            </div>
            <Link
              href="/register"
              className="text-gray-600 hover:text-black transition-colors"
            >
              สมัครสมาชิกใหม่
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-4">
              Welcome Back
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Login Account
            </h1>
            <p className="text-xl text-gray-600 max-w-sm mx-auto leading-relaxed">
              Fill below to access your account.
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-8 sm:p-10">
                {/* Username */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    ชื่อผู้ใช้
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="กรอกชื่อผู้ใช้ของคุณ"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none text-black ${
                      errors.username
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black hover:border-gray-300"
                    }`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="กรอกรหัสผ่านของคุณ"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none text-black ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black hover:border-gray-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="mb-8 text-right">
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    ลืมรหัสผ่าน?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      กำลังเข้าสู่ระบบ...
                    </div>
                  ) : (
                    "เข้าสู่ระบบ"
                  )}
                </button>

                {/* Alternative Actions */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-gray-600 mb-4">ยังไม่มีบัญชี?</p>
                  <Link
                    href="/register"
                    className="inline-block w-full px-8 py-4 border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:border-black hover:bg-gray-50 transition-all duration-300"
                  >
                    สมัครสมาชิก
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              การเข้าสู่ระบบแสดงว่าคุณยอมรับ{" "}
              <a href="#" className="text-black hover:underline font-medium">
                ข้อกำหนดการใช้งาน
              </a>{" "}
              และ{" "}
              <a href="#" className="text-black hover:underline font-medium">
                นโยบายความเป็นส่วนตัว
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
