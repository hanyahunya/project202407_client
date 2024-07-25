import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ModalContainer = styled.div`
  top: 45px;
  left: 10px;
  position: absolute;
  background-color: #313131;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 200px;
  z-index: 1000;
`;

const ModalBody = styled.div`
  padding: 10px;
  color: #9b9b9b;
`;

const ModalButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  background: transparent;
  border: none;
  color: #9b9b9b;
  cursor: pointer;
  text-align: left;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  svg {
    margin-right: 8px;
  }
`;

const AccountModal = ({ onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // 로그아웃 후 홈으로 이동
    onClose(); // 로그아웃 후 모달 닫기
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ModalContainer ref={modalRef} className="account-modal">
      <ModalBody>
        <ModalButton onClick={(e) => e.stopPropagation()}>
          <FaUser /> 내 계정
        </ModalButton>
        <ModalButton onClick={(e) => {
          e.stopPropagation();
          handleLogout();
        }}>
          <FaSignOutAlt /> 로그아웃
        </ModalButton>
      </ModalBody>
    </ModalContainer>
  );
};

export default AccountModal;
