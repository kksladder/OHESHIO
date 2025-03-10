import React, { useState } from 'react';
import Buttons from '../../ui/Buttons';
import PopupModal from './PopupModal';

const MyPageUserInfo = () => {
  const [userData, setUserData] = useState({
    name: '홍길동',
    email: 'gildong@example.com',
    password: 'default1234',
    address: {
      receiver: '홍길동',
      address: '서울특별시 강남구 테헤란로',
      phone: '010-1234-5678',
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSave = (updatedData) => {
    if (modalType === 'profile') {
      setUserData((prev) => ({ ...prev, name: updatedData.name, email: updatedData.email }));
    } else if (modalType === 'password') {
      setUserData((prev) => ({ ...prev, password: updatedData.new }));
    } else if (modalType === 'address') {
      setUserData((prev) => ({ ...prev, address: updatedData }));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="border-t border-gray-300">
      <div className="w-full min-h-screen bg-white flex flex-col items-center pt-10">
        <div className="container max-w-[1280px] mx-auto">
          {/* 🔹 프로필 정보 */}
          <div className="bg-[#F1F5F9] rounded-lg shadow-md p-6 flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">👤</div>
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold cursor-pointer" onClick={() => openModal('profile')}>
                  {userData.name}
                </h3>
                <p className="text-gray-500 text-sm cursor-pointer" onClick={() => openModal('profile')}>
                  {userData.email}
                </p>
              </div>
            </div>
            <Buttons
              size="small"
              state="default"
              className="w-[80px] h-[32px] px-4 text-sm"
              onClick={() => openModal('profile')}
            >
              수정
            </Buttons>
          </div>

          <div className="bg-[#F1F5F9] rounded-lg shadow-md p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">비밀번호</span>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-sm">
                  {userData.password.length >= 2
                    ? userData.password.slice(0, 2) + '*'.repeat(userData.password.length - 2)
                    : '*'.repeat(userData.password.length)}
                </p>
                <Buttons
                  size="small"
                  state="default"
                  className="w-[80px] h-[32px] px-4 text-sm"
                  onClick={() => openModal('password')}
                >
                  변경
                </Buttons>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">배송지</span>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 text-sm">{userData.address.address}</p>
                <Buttons
                  size="small"
                  state="default"
                  className="w-[80px] h-[32px] px-4 text-sm"
                  onClick={() => openModal('address')}
                >
                  관리
                </Buttons>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Buttons size="medium" state="default">
              로그아웃
            </Buttons>
            <Buttons size="medium" state="danger" onClick={() => openModal('confirmDelete')}>
              회원탈퇴
            </Buttons>
          </div>
        </div>

        {isModalOpen && (
          <PopupModal
            type={modalType}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            currentName={userData.name}
            currentEmail={userData.email}
            currentAddress={userData.address}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageUserInfo;
