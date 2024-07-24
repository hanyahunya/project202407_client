import React from 'react';
import styled from 'styled-components';

const MainContentContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 0;
  overflow-y: auto;
  background-color: #202124; /* 구글 다크 모드 배경색 */
`;

const MainContent = ({ children }) => {
  return (
    <MainContentContainer>
      {children}
    </MainContentContainer>
  );
};

export default MainContent;
