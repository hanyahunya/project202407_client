import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import AddMemberModal from './AddMemberModal';
import ProjectSettingsModal from './ProjectSettingsModal';
import ProjectRenameModal from './ProjectRenameModal';
import axios from '../../axiosConfig';

const ModalContainer = styled.div`
  position: absolute;
  background-color: #202020;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  color: #D4D4D4;
  padding: 10px;
  width: 200px;
  z-index: 1001;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

const Button = styled.button`
  background: transparent;
  color: #D4D4D4;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 1px;
  margin: 5px 0;
  width: 100%;
  cursor: pointer;
  text-align: left;
  padding-left: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
`;

const ProjectOptionsModal = ({ top, left, projectId, onClose }) => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isProjectSettingsModalOpen, setIsProjectSettingsModalOpen] = useState(false);
  const [isProjectRenameModalOpen, setIsProjectRenameModalOpen] = useState(false);
  const [projectName, SetProjectName] = useState("");
  const modalRef = useRef(null);

  const handleOpenAddMemberModal = async () => {
    const res = await axios.get(`/api/projects/${projectId}`);
    SetProjectName(res.data.projectName);
    setIsAddMemberModalOpen(true);
  };

  const handleCloseAddMemberModal = () => {
    setIsAddMemberModalOpen(false);
    onClose();
  };

  const handleOpenProjectSettingsModal = () => {
    setIsProjectSettingsModalOpen(true);
  };

  const handleCloseProjectSettingsModal = () => {
    setIsProjectSettingsModalOpen(false);
    onClose();
  };

  const handleOpenProjectRenameModal = () => {
    setIsProjectRenameModalOpen(true);
  };

  const handleCloseProjectRenameModal = () => {
    setIsProjectRenameModalOpen(false);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !isAddMemberModalOpen &&
      !isProjectSettingsModalOpen &&
      !isProjectRenameModalOpen
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddMemberModalOpen, isProjectSettingsModalOpen, isProjectRenameModalOpen]);

  return (
    <>
      <ModalContainer ref={modalRef} top={top} left={left}>
        <Button onClick={handleOpenAddMemberModal}>멤버 추가</Button>
        <Button onClick={handleOpenProjectSettingsModal}>팀 프로젝트 설정</Button>
        <Button onClick={handleOpenProjectRenameModal}>프로젝트 이름 변경</Button>
      </ModalContainer>
      {isAddMemberModalOpen && (
        <AddMemberModal
          top={top + 50}
          left={left}
          onClose={handleCloseAddMemberModal}
          projectId={projectId}
          projectName={projectName}
        />
      )}
      {isProjectSettingsModalOpen && (
        <ProjectSettingsModal
          top={top + 100}
          left={left}
          onClose={handleCloseProjectSettingsModal}
        />
      )}
      {isProjectRenameModalOpen && (
        <ProjectRenameModal
          top={top + 150}
          left={left}
          onClose={handleCloseProjectRenameModal}
          projectId={projectId}
        />
      )}
    </>
  );
};

export default ProjectOptionsModal;
