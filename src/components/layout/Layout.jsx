import React from 'react';
import Sidebar from './Sidebar'; // 경로 업데이트
import TopBar from './TopBar'; // 경로 업데이트
import MainContent from './MainContent'; // 경로 업데이트
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
  width: ${({ width }) => width}px; /* 사이드바 너비를 동적으로 설정 */
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
`;

const TopBarWrapper = styled.div`
  width: calc(100% - ${({ sidebarWidth }) => sidebarWidth}px); /* 사이드바 너비만큼을 제외한 나머지 공간을 차지 */
  height: 4vh;
  background-color: #3498db;
  color: #ecf0f1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebarWidth }) => sidebarWidth}px; /* 사이드바 너비만큼 왼쪽으로 이동 */
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
  background-color: #202124; /* 구글 다크 모드 배경색 */
  overflow: hidden; /* 스크롤 바를 제거하고 콘텐츠가 넘치면 숨김 */
  padding: 0; /* 패딩 제거 */
`;

const Layout = ({ sidebarWidth, setSidebarWidth, projects }) => {
  return (
    <LayoutContainer>
      <SidebarWrapper width={sidebarWidth}>
        <Sidebar sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth} projects={projects} />
      </SidebarWrapper>
      <TopBarWrapper sidebarWidth={sidebarWidth}>
        <TopBar />
      </TopBarWrapper>
      <MainContentWrapper>
        <MainContent />
      </MainContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;
