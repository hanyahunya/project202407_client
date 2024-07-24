import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0; /* 패딩 제거 */
  box-sizing: border-box;
  width: ${({ width }) => width}px; /* 사이드바 너비를 동적으로 설정 */
  position: relative;
`;

const ProjectItem = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #3b3e44;
  border-radius: 5px;
  &:hover {
    background-color: #4b4f55;
  }
  border: none; /* 테두리 제거 */
  box-shadow: none; /* 그림자 제거 */
`;

const ProjectTitle = styled.h3`
  margin: 0;
`;

const Sidebar = ({ sidebarWidth, projects }) => {
  return (
    <SidebarContainer width={sidebarWidth}>
      <h2>프로젝트 목록</h2>
      {projects.map((project) => (
        <ProjectItem key={project.projectId}>
          <ProjectTitle>{project.projectName}</ProjectTitle>
        </ProjectItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
