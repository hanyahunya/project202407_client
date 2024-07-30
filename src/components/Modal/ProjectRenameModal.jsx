import axios from '../../axiosConfig';
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: absolute;
  background-color: #202020;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  color: #D4D4D4;
  padding: 20px;
  width: 400px;
  z-index: 1002;
  top: ${props => props.top - 150}px;
  left: ${props => props.left}px;
`;

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #D4D4D4;
  background-color: #333;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#2383e2' : '#555'};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.6 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;

const ProjectRenameModal = ({ top, left, onClose, projectId }) => {
  const modalRef = useRef(null);
  const [newProjectName, setNewProjectName] = useState('');

  const handleInputChange = (e) => {
    setNewProjectName(e.target.value);
  };

  const handleRename = async () => {
    if (newProjectName.trim() !== '') {
      await axios.post('/api/projects/update', {projectId, "projectName" : newProjectName});
      window.location.reload(); // 페이지 새로 고침
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRename();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ModalContainer ref={modalRef} top={top} left={left}>
      <Title>프로젝트 이름 변경</Title>
      <Input 
        type="text" 
        value={newProjectName} 
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="새 프로젝트 이름을 입력하세요"
      />
      <ButtonContainer>
        <Button onClick={onClose}>취소</Button>
        <Button primary onClick={handleRename} disabled={newProjectName.trim() === ''}>
          변경
        </Button>
      </ButtonContainer>
    </ModalContainer>
  );
};

export default ProjectRenameModal;