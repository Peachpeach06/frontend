"use client";

import React, { useState, useEffect } from "react";
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
      case "warning":
        return {
          icon: "⚠️",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          iconColor: "text-yellow-600",
          titleColor: "text-yellow-800",
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

// Confirm Modal Component
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all">
        <div className="p-6 rounded-t-2xl bg-red-50 border-red-200 border-b">
          <div className="flex items-center space-x-3">
            <div className="text-2xl text-red-600">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800">{title}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            {message}
          </p>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              ยกเลิก
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              ลบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Edit Modal Component
const EditModal = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    id: "",
    firstname: "",
    fullname: "",
    lastname: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    birthday: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        firstname: user.firstname,
        fullname: user.fullname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
        address: user.address,
        sex: user.sex,
        birthday: user.birthday,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 transform transition-all max-h-[90vh] overflow-y-auto">
        <div className="p-6 rounded-t-2xl bg-blue-50 border-blue-200 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl text-blue-600">✏️</div>
              <h3 className="text-lg font-semibold text-blue-800">
                แก้ไขข้อมูลผู้ใช้
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                คำนำหน้า
              </label>
              <select
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none text-black bg-white"
              >
                <option value="">เลือกคำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </select>
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
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none text-black"
              />
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
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none text-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                เพศ
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none text-black bg-white"
              >
                <option value="">เลือกเพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
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
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none text-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ที่อยู่
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none resize-none text-black"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 px-4 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  บันทึก...
                </div>
              ) : (
                "บันทึก"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    userId: null,
    username: "",
  });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    user: null,
  });
  const router = useRouter();

  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }

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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://backend-nextjs-virid.vercel.app/api/users"
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        showModal("error", "เกิดข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showModal(
        "error",
        "เกิดข้อผิดพลาด",
        "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `https://backend-nextjs-virid.vercel.app/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        showModal("success", "ลบสำเร็จ", "ลบข้อมูลผู้ใช้เรียบร้อยแล้ว");
        fetchUsers(); // Refresh the list
      } else {
        const error = await response.json();
        showModal(
          "error",
          "เกิดข้อผิดพลาด",
          error.message || "ไม่สามารถลบข้อมูลได้"
        );
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showModal(
        "error",
        "เกิดข้อผิดพลาด",
        "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"
      );
    }
  };

  const handleEdit = async (formData) => {
    try {
      const response = await fetch(
        `https://backend-nextjs-virid.vercel.app/api/users`, // ไม่ต้องใช้ /:id
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // formData มี id อยู่แล้ว
        }
      );

      if (response.ok) {
        showModal("success", "แก้ไขสำเร็จ", "แก้ไขข้อมูลผู้ใช้เรียบร้อยแล้ว");
        setEditModal({ isOpen: false, user: null });
        fetchUsers(); // Refresh the list
      } else {
        const error = await response.json();
        showModal(
          "error",
          "เกิดข้อผิดพลาด",
          error.message || "ไม่สามารถแก้ไขข้อมูลได้"
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showModal(
        "error",
        "เกิดข้อผิดพลาด",
        "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"
      );
    }
  };

  const openDeleteConfirm = (userId, username) => {
    setConfirmModal({
      isOpen: true,
      userId,
      username,
    });
  };

  const closeDeleteConfirm = () => {
    setConfirmModal({
      isOpen: false,
      userId: null,
      username: "",
    });
  };

  const confirmDelete = () => {
    handleDelete(confirmModal.userId);
    closeDeleteConfirm();
  };

  const openEditModal = (user) => {
    setEditModal({
      isOpen: true,
      user,
    });
  };

  const closeEditModal = () => {
    setEditModal({
      isOpen: false,
      user: null,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modals */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDelete}
        title="ยืนยันการลบ"
        message={`คุณต้องการลบผู้ใช้ "${confirmModal.username}" ใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้`}
      />

      <EditModal
        isOpen={editModal.isOpen}
        onClose={closeEditModal}
        onSave={handleEdit}
        user={editModal.user}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                จัดการผู้ใช้
              </span>
            </div>
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? "กำลังโหลด..." : "รีเฟรช"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mr-3"></div>
            <span className="text-gray-600">กำลังโหลดข้อมูล...</span>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      ผู้ใช้ทั้งหมด
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {users.length} คน
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Grid */}
            {users.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">👤</span>
                </div>
                <p className="text-gray-500">ไม่มีข้อมูลผู้ใช้</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-700">
                              {user.fullname?.charAt(0) ||
                                user.username?.charAt(0) ||
                                "?"}
                            </span>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {user.firstname} {user.fullname} {user.lastname}
                            </h3>
                            <p className="text-sm text-gray-500">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">
                          ID: {user.id}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">เพศ:</span>
                          <span className="text-gray-900">
                            {user.sex || "-"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">วันเกิด:</span>
                          <span className="text-gray-900">
                            {user.birthday
                              ? new Date(user.birthday).toLocaleDateString(
                                  "th-TH"
                                )
                              : "-"}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">ที่อยู่:</span>
                          <p className="text-gray-900 mt-1 line-clamp-2">
                            {user.address || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          ✏️ แก้ไข
                        </button>
                        <button
                          onClick={() =>
                            openDeleteConfirm(user.id, user.username)
                          }
                          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                          🗑️ ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
