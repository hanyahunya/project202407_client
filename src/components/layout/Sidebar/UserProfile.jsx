import React from 'react';
import styled from 'styled-components';

const UserProfileContainer = styled.div`
  background-color: transparent; /* 기본 배경 색상 */
  color: rgba(255, 255, 255, 0.81); /* 텍스트 색상 */
  display: flex;
  align-items: center;
  height: 44px; /* 세로 길이 설정 */
  padding: 0 1rem; /* 좌우 패딩 */
  box-sizing: border-box;
  width: 100%; /* 사이드바의 가로 길이에 맞게 꽉 채우기 */
  border-radius: 4px; /* 모서리 둥글게 */
  transition: background-color 0.3s ease; /* 배경색 변경 시 애니메이션 */
  cursor: pointer; /* 클릭 가능하게 설정 */
  &:hover {
    background-color: #2c2c2c; /* 마우스를 올렸을 때 배경색 변경 */
  }
`;

const UserName = styled.div`
  font-size: 16px; /* 폰트 크기 */
  font-weight: 500; /* 폰트 두께 */
  white-space: nowrap; /* 텍스트가 한 줄로 유지되도록 설정 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 생략부호(...) 표시 */
  line-height: 20px; /* 줄 높이 설정 */
`;

const UserProfile = ({ userName, onClick }) => {
  return (
    <UserProfileContainer onClick={onClick}>
      <UserName>{userName}</UserName>
    </UserProfileContainer>
  );
};

export default UserProfile;
