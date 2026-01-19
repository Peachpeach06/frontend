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

          <Link
            href="/login"
            className="inline-block w-full px-4 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            ตกลง
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Register() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    fullname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    sex: "",
    birthday: "",
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = "กรุณากรอกชื่อต้น";
    if (!formData.fullname.trim()) newErrors.fullname = "กรุณากรอกชื่อเต็ม";
    if (!formData.lastname.trim()) newErrors.lastname = "กรุณากรอกนามสกุล";
    if (!formData.username.trim()) newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    if (!formData.password) newErrors.password = "กรุณากรอกรหัสผ่าน";
    if (formData.password.length < 6)
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    if (!formData.address.trim()) newErrors.address = "กรุณากรอกที่อยู่";
    if (!formData.sex) newErrors.sex = "กรุณาเลือกเพศ";
    if (!formData.birthday) newErrors.birthday = "กรุณาเลือกวันเกิด";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/users");
    }
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://food-backend-three-topaz.vercel.app/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: formData.firstname,
            fullname: formData.fullname,
            lastname: formData.lastname,
            username: formData.username,
            password: formData.password,
            address: formData.address,
            sex: formData.sex,
            birthday: formData.birthday,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("User created:", result);

        // Show success modal
        showModal(
          "success",
          "สมัครสมาชิกสำเร็จ!",
          "ยินดีต้อนรับเข้าสู่ระบบ คุณสามารถเข้าสู่ระบบได้แล้ว"
        );

        // Reset form
        setFormData({
          firstname: "",
          fullname: "",
          lastname: "",
          username: "",
          password: "",
          confirmPassword: "",
          address: "",
          sex: "",
          birthday: "",
        });
      } else {
        const error = await response.json();
        showModal(
          "error",
          "เกิดข้อผิดพลาด",
          error.message ||
            "ไม่สามารถสมัครสมาชิกได้ กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง"
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
              <span className="text-xl font-semibold text-gray-900">
                Register
              </span>
            </div>
            <a
              href="#"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Already have an account?
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-4">
              Join Our Community
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
              Experience the future of technology with our innovative platform.
            </p>
          </div>

          {/* Registration Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="p-8 sm:p-10">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      คำนำหน้า
                    </label>
                    <select
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none bg-white text-black ${
                        errors.firstname
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-black hover:border-gray-300"
                      }`}
                    >
                      <option value="">เลือกคำนำหน้า</option>
                      <option value="นาย">นาย</option>
                      <option value="นาง">นาง</option>
                      <option value="นางสาว">นางสาว</option>
                    </select>
                    {errors.firstname && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstname}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      ชื่อ
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      placeholder="ชื่อจริง"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none text-black ${
                        errors.fullname
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-black hover:border-gray-300"
                      }`}
                    />
                    {errors.fullname && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.fullname}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      นามสกุล
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      placeholder="นามสกุล"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none text-black ${
                        errors.lastname
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-black hover:border-gray-300"
                      }`}
                    />
                    {errors.lastname && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastname}
                      </p>
                    )}
                  </div>
                </div>

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
                    placeholder="ชื่อผู้ใช้สำหรับเข้าสู่ระบบ"
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

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      รหัสผ่าน
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="อย่างน้อย 6 ตัวอักษร"
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      ยืนยันรหัสผ่าน
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="ป้อนรหัสผ่านอีกครั้ง"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none text-black ${
                        errors.confirmPassword
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-black hover:border-gray-300"
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      เพศ
                    </label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none bg-white text-black ${
                        errors.sex
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-black hover:border-gray-300"
                      }`}
                    >
                      <option value="">เลือกเพศ</option>
                      <option value="ชาย">ชาย</option>
                      <option value="หญิง">หญิง</option>
                    </select>
                    {errors.sex && (
                      <p className="mt-1 text-sm text-red-500">{errors.sex}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      วันเกิด
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none text-black ${
                        errors.birthday
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-black hover:border-gray-300"
                      }`}
                    />
                    {errors.birthday && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.birthday}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    ที่อยู่
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="ที่อยู่เต็ม รวมรหัสไปรษณีย์"
                    rows="4"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none text-black ${
                      errors.address
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-black hover:border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
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
                      กำลังสมัครสมาชิก...
                    </div>
                  ) : (
                    "สมัครสมาชิก"
                  )}
                </button>

                {/* Alternative Actions */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-gray-600 mb-4">หรือ</p>
                  <Link
                    href="/login"
                    className="inline-block w-full px-8 py-4 border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:border-black hover:bg-gray-50 transition-all duration-300"
                  >
                    เข้าสู่ระบบ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              การสมัครสมาชิกแสดงว่าคุณยอมรับ{" "}
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
