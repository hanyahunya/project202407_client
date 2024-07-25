import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProjectCreateModal from '../../Modal/ProjectCreateModal'; // 모달 컴포넌트 임포트

const SidebarContainer = styled.div`
  background-color: #202020; /* 사이드바 배경색 */
  color: #9B9B9B; /* 기본 글씨 색상 */
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0; /* 패딩 제거 */
  box-sizing: border-box;
  width: 290px; /* 사이드바 고정 너비 */
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  position: relative;
  cursor: pointer; /* 클릭할 수 있는 커서 */
  &:hover {
    background-color: #333333; /* 제목 영역 hover 시 배경색 변경 */
  }
`;

const Title = styled.h2`
  margin: 0;
  flex: 1; /* 제목을 가능한 넓게 설정 */
  color: #9B9B9B; /* 제목 글씨 색상 */
`;

const AddButton = styled.button`
  position: absolute;
  right: 10px;
  background-color: transparent; /* 기본 배경 투명 */
  color: #3498db; /* 버튼 텍스트 색상 */
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  opacity: 0; /* 기본적으로 버튼을 투명하게 설정 */
  transition: opacity 0.3s ease; /* 투명도 변화에 애니메이션 추가 */
  
  /* + 버튼 위에 마우스를 올렸을 때 */
  &:hover {
    background-color: rgba(255, 255, 255, 0.3); /* 버튼 hover 시 배경색 변경 */
    opacity: 1; /* 버튼을 불투명하게 변경 */
  }
`;

const ProjectList = styled.div`
  transition: max-height 0.3s ease;
  overflow: hidden;
  max-height: ${props => props.isHidden ? '0' : '1000px'}; /* 숨길 때 max-height를 0으로 설정 */
`;

const ProjectItem = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem; /* 적절한 패딩 추가 */
  background-color: ${props => props.selected ? '#2C2C2C' : 'transparent'}; /* 선택된 경우 배경색 변경 */
  border-radius: 5px;
  &:hover {
    background-color: ${props => props.selected ? '#2C2C2C' : 'rgba(255, 255, 255, 0.1)'}; /* 선택된 경우 hover 배경색 유지 */
  }
  border: none; /* 테두리 제거 */
  box-shadow: none; /* 그림자 제거 */
  color: ${props => props.selected ? '#E1E1E1' : '#9B9B9B'}; /* 선택된 경우 글씨 색상 변경 */
  cursor: pointer; /* 클릭할 수 있음을 나타내는 커서 */
`;

const ProjectTitle = styled.h3`
  margin: 0;
  color: inherit; /* 상속받은 색상 사용 */
`;

const SectionItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${props => props.selected ? '#2C2C2C' : 'transparent'}; /* 선택된 경우 배경색 변경 */
  border-radius: 5px;
  &:hover {
    background-color: ${props => props.selected ? '#2C2C2C' : 'rgba(255, 255, 255, 0.1)'}; /* 선택된 경우 hover 배경색 유지 */
  }
  border: none; /* 테두리 제거 */
  box-shadow: none; /* 그림자 제거 */
  color: ${props => props.selected ? '#E1E1E1' : '#9B9B9B'}; /* 선택된 경우 글씨 색상 변경 */
  cursor: pointer; /* 클릭할 수 있음을 나타내는 커서 */
`;

const Sidebar = ({ projects = [], selectedProject, selectedSection, onProjectClick, onSectionClick }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 로컬스토리지에서 사이드바 상태를 불러오기
    const savedState = localStorage.getItem('sidebarHidden');
    if (savedState) {
      setIsHidden(JSON.parse(savedState));
    }
  }, []);

  const handleToggleSidebar = () => {
    setIsHidden(prevState => {
      const newState = !prevState;
      localStorage.setItem('sidebarHidden', JSON.stringify(newState)); // 로컬스토리지에 상태 저장
      return newState;
    });
  };

  const handleAddButtonClick = (e) => {
    e.stopPropagation(); // 사이드바 클릭 이벤트 전파 방지
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <SidebarContainer>
      <Header onClick={handleToggleSidebar}>
        <Title>프로젝트 목록</Title>
        <AddButton className="add-button" onClick={handleAddButtonClick}>+</AddButton>
      </Header>
      <ProjectList isHidden={isHidden}>
        {projects.map((project) => (
          <React.Fragment key={project.projectId}>
            <ProjectItem
              selected={project === selectedProject && !selectedSection}
              onClick={() => onProjectClick(project)}
            >
              <ProjectTitle>{project.projectName}</ProjectTitle>
            </ProjectItem>
            {project === selectedProject && (
              <div>
                <SectionItem
                  selected={selectedSection === 'tasks'}
                  onClick={() => onSectionClick('tasks')}
                >
                  작업
                </SectionItem>
                <SectionItem
                  selected={selectedSection === 'calendar'}
                  onClick={() => onSectionClick('calendar')}
                >
                  회의 캘린더
                </SectionItem>
              </div>
            )}
          </React.Fragment>
        ))}
      </ProjectList>
      <ProjectCreateModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </SidebarContainer>
  );
};

export default Sidebar;
