import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar'; // 경로 업데이트
import TopBar from './TopBar'; // 경로 업데이트
import Tasks from './Sidebar/Tasks'; // 하위 페이지 컴포넌트 임포트
import MeetingCalendar from './Sidebar/MeatingCalendar'; // 하위 페이지 컴포넌트 임포트
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #202124; /* 구글 다크 모드 배경색 */
  color: #e8eaed; /* 구글 다크 모드 텍스트 색상 */
  margin: 0; /* 기본 여백 제거 */
`;

const SidebarWrapper = styled.div`
  width: 290px; /* 사이드바 고정 너비 */
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
`;

const TopBarWrapper = styled.div`
  width: calc(100% - 290px); /* 사이드바 너비만큼을 제외한 나머지 공간을 차지 */
  height: 4vh;
  background-color: #191919; /* 상단바 배경색 */
  color: #D4D4D4; /* 상단바 글자색 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 290px; /* 사이드바 너비만큼 왼쪽으로 이동 */
  z-index: 1;
  border: none; /* 테두리 제거 */
  box-shadow: none; /* 그림자 제거 */
  padding: 0; /* 패딩 제거 */
`;

const MainContentWrapper = styled.div`
  margin-top: 4vh; /* 상단바의 높이만큼 마진 추가 */
  flex: 1; /* 나머지 공간을 차지하도록 설정 */
  display: flex;
  flex-direction: column;
  background-color: #191919; /* 메인 컨텐츠 배경색 */
  overflow: hidden; /* 스크롤 바를 제거하고 콘텐츠가 넘치면 숨김 */
  padding: 0; /* 패딩 제거 */
  color: #D4D4D4; /* 텍스트 색상 */
`;

const Layout = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [previousContent, setPreviousContent] = useState(null);

  const handleProjectClick = (project) => {
    if (selectedProject === project) {
      // 현재 프로젝트와 동일한 프로젝트를 클릭하면 선택 해제
      setSelectedProject(null);
      setSelectedSection(null);
    } else {
      // 다른 프로젝트를 클릭하면 해당 프로젝트를 선택하고 섹션을 초기화
      setPreviousContent(renderContent()); // 현재 콘텐츠 저장
      setSelectedProject(project);
      setSelectedSection(null);
    }
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    if (!selectedProject) {
      // return previousContent; // Return previous content or null if no project is selected
      return localStorage.getItem('prevPage');
    }
  
    switch (selectedSection) {
      case 'tasks':
        return <Tasks projectId={selectedProject.projectId} />;
      case 'calendar':
        return <MeetingCalendar projectId={selectedProject.projectId} />;
      default:
        // If no section is selected, you can render a default component or message
        return previousContent;
    }
  };
  

  return (
    <LayoutContainer>
      <SidebarWrapper>
        <Sidebar 
          projects={projects} 
          selectedProject={selectedProject}
          onProjectClick={handleProjectClick} 
          onSectionClick={handleSectionClick} 
          selectedSection={selectedSection} // Add this prop
        />
      </SidebarWrapper>
      <TopBarWrapper>
        <TopBar />
      </TopBarWrapper>
      <MainContentWrapper>
        {renderContent()}
      </MainContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;
