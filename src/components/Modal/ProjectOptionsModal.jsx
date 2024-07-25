import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: absolute;
  background-color: #202020;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  color: #D4D4D4;
  padding: 10px;
  width: 200px; /* 적절한 너비 설정 */
  z-index: 1001;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  transform: translateX(140px); /* 오른쪽으로 140px 이동 */
`;

const Button = styled.button`
  background: transparent; /* 배경을 투명하게 */
  color: #D4D4D4;
  border: 1px solid transparent; /* 테두리를 투명하게 */
  border-radius: 5px;
  padding: 1px; /* 패딩을 1px로 설정 */
  margin: 5px 0; /* 버튼 간격 조정 */
  width: 100%; /* 버튼 가로 길이를 최대한으로 설정 */
  cursor: pointer;
  text-align: left; /* 텍스트를 좌측 정렬 */
  padding-left: 10px; /* 좌측 패딩 추가하여 텍스트와 버튼 테두리 사이에 여백을 둠 */
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* hover 시 배경색 변경 */
    color: #ffffff;
  }
`;

const ProjectOptionsModal = ({ top, left, onClose }) => {
  return (
    <ModalContainer top={top} left={left}>
      <Button onClick={onClose}>멤버 추가</Button>
      <Button onClick={onClose}>팀 프로젝트 설정</Button>
    </ModalContainer>
  );
};

export default ProjectOptionsModal;
