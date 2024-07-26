import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import ProjectCreateModal from '../../Modal/ProjectCreateModal';
import ProjectOptionsModal from '../../Modal/ProjectOptionsModal';
import AccountModal from '../../Modal/AccountModal';
import { FaChevronDown, FaChevronRight, FaEllipsisH } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import UserProfile from './UserProfile';

const SidebarContainer = styled.div`
  background-color: #202020;
  color: #9B9B9B;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
  box-sizing: border-box;
  width: 290px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #333333;
  }
  &:hover .add-button {
    opacity: 1;
    background-color: #333333;
  }
`;

const Title = styled.h2`
  margin: 0;
  flex: 1;
  color: #9B9B9B;
  ${(props) =>
    props.small &&
    css`
      font-size: 12px;
      line-height: 1;
      color: rgb(155, 155, 155);
      font-weight: 500;
      transition: color 100ms ease-out;
    `}
`;

const AddButton = styled.button`
  position: absolute;
  right: 10px;
  background-color: transparent;
  color: #3498db;
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  &:hover {
    background-color: #555555;
    opacity: 1;
  }
  &:hover + .tooltip {
    display: block;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333333;
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  white-space: nowrap;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  z-index: 0;
`;

const ProjectList = styled.div`
  transition: max-height 0.3s ease;
  overflow: hidden;
  max-height: ${(props) => (props.isHidden ? '0' : '1000px')};
`;

const ProjectItem = styled.div`
  width: 100%;
  height: 30px;
  padding: 5px;
  margin-bottom: 0rem;
  background-color: ${(props) => (props.selected ? '#2C2C2C' : 'transparent')};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  &:hover {
    background-color: ${(props) =>
      props.selected ? '#2C2C2C' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const IconContainer = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  color: #686868;
  font-size: 14px;
  transition: transform 0.3s ease;
  margin-left: 5px;
`;

const BulletPoint = styled.div`
  color: #686868;
  font-size: 16px;
  margin-right: 8px;
`;

const ProjectTitle = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  flex: 1;
  margin-left: 8px;
`;

const SectionItem = styled.div`
  width: 290px;
  height: 30px;
  padding: 0px;
  margin-bottom: 0rem;
  background-color: ${(props) => (props.selected ? '#2C2C2C' : 'transparent')};
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => (props.selected ? '#E1E1E1' : '#9B9B9B')};
  padding-left: 16px;
  &:hover {
    background-color: ${(props) =>
      props.selected ? '#2C2C2C' : 'rgba(255, 255, 255, 0.1)'};
  }
  border: none;
  box-shadow: none;
  cursor: pointer;
`;

const OptionsButton = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #9b9b9b;
  cursor: pointer;
  font-size: 16px;
  margin-left: 5px;
  ${ProjectItem}:hover & {
    display: flex;
  }
  &:hover {
    color: #ffffff;
  }
`;

const Sidebar = ({
  projects = [],
  selectedProject,
  selectedSection,
  onProjectClick,
  onSectionClick,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [rightClickProject, setRightClickProject] = useState(null);
  const [userName, setUserName] = useState('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const accountModalRef = useRef(null);
  const optionsModalRef = useRef(null);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarHidden');
    if (savedState) {
      setIsHidden(JSON.parse(savedState));
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.nickname);
    }
  }, []);

  const handleToggleSidebar = () => {
    setIsHidden((prevState) => {
      const newState = !prevState;
      localStorage.setItem('sidebarHidden', JSON.stringify(newState));
      return newState;
    });
  };

  const handleAddButtonClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const handleProjectRightClick = (project, e) => {
    e.preventDefault();
    e.stopPropagation();
    setRightClickProject(project);
    const rect = e.target.getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY + 20,
      left: rect.left + window.scrollX + 20,
    });
    setIsOptionsModalOpen(true);
  };

  const handleOptionsButtonClick = (project, e) => {
    e.stopPropagation();
    setRightClickProject(project);
    const rect = e.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY + 20,
      left: rect.left + window.scrollX + 20,
    });
    setIsOptionsModalOpen(true);
  };

  const handleClickOutside = (e) => {
    if (
      (accountModalRef.current && !accountModalRef.current.contains(e.target)) &&
      (optionsModalRef.current && !optionsModalRef.current.contains(e.target))
    ) {
      setIsOptionsModalOpen(false);
      setIsAccountModalOpen(false);
    }
  };

  useEffect(() => {
    if (isOptionsModalOpen || isAccountModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOptionsModalOpen, isAccountModalOpen]);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setIsAccountModalOpen(true);
  };

  

  return (
    <SidebarContainer>
      <UserProfile userName={userName} onClick={handleProfileClick} />
      <Header onClick={handleToggleSidebar}>
        <Title small>팀 프로젝트</Title>
        <AddButton
          className="add-button"
          onClick={handleAddButtonClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          +
          <Tooltip visible={isTooltipVisible}>새 프로젝트 생성</Tooltip>
        </AddButton>
      </Header>
      <ProjectList isHidden={isHidden}>
        {projects.map((project) => (
          <React.Fragment key={project.projectId}>
            <ProjectItem
              selected={project === selectedProject && !selectedSection}
              onClick={() => {
                if (!isOptionsModalOpen) {
                  onProjectClick(project);
                }
              }}
              onContextMenu={(e) => handleProjectRightClick(project, e)}
            >
              <IconContainer>
                <Icon>
                  {project === selectedProject ? <FaChevronDown /> : <FaChevronRight />}
                </Icon>
              </IconContainer>
              <ProjectTitle>{project.projectName}</ProjectTitle>
              <OptionsButton onClick={(e) => handleOptionsButtonClick(project, e)}>
                <FaEllipsisH />
              </OptionsButton>
            </ProjectItem>
            {project === selectedProject && (
              <div>
                <SectionItem
                  selected={selectedSection === 'tasks'}
                  onClick={() => onSectionClick('tasks')}
                >
                  <BulletPoint>・</BulletPoint>
                  작업
                </SectionItem>
                <SectionItem
                  selected={selectedSection === 'calendar'}
                  onClick={() => onSectionClick('calendar')}
                >
                  <BulletPoint>・</BulletPoint>
                  회의 캘린더
                </SectionItem>
              </div>
            )}
          </React.Fragment>
        ))}
      </ProjectList>
      <ProjectCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />
      {isOptionsModalOpen && rightClickProject && (
        <ProjectOptionsModal
          ref={optionsModalRef}
          top={modalPosition.top}
          left={modalPosition.left}
          onClose={() => setIsOptionsModalOpen(false)}
        />
      )}
      {isAccountModalOpen && (
        <AccountModal
          ref={accountModalRef}
          className="account-modal"
          onClose={() => setIsAccountModalOpen(false)}
        />
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
