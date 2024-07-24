import React from 'react';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3498db;
  color: #ecf0f1;
  padding: 0; /* 패딩 제거 */
`;

const TopBar = () => {
  return (
    <TopBarContainer>
      <h2>메인 콘텐츠 정보</h2>
    </TopBarContainer>
  );
};

export default TopBar;
