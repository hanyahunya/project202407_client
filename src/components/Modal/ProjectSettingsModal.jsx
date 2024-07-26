import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ProjectSettingsModal = ({ isOpen, onClose, project }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>프로젝트 설정</h2>
        {/* 프로젝트 설정 로직 */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProjectSettingsModal;
