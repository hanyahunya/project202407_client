import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../../axiosConfig';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 어두운 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #202020;
  width: 480px;
  height: 400px;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: #D5D5D5;
  margin: 0;
`;

const Label = styled.label`
  display: block;
  color: #838383;
  margin: 10px 0 5px 0;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  background-color: #2C2C2C;
  color: #FFFFFF;
  border: 1px solid #4A4A4A;
  padding: 8px;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: calc(100% - 20px);
  background-color: #2C2C2C;
  color: #FFFFFF;
  border: 1px solid #4A4A4A;
  padding: 8px;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  resize: none;
`;

const CreateButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: ${props => props.disabled ? '#21476D' : '#2383E2'};
  color: ${props => props.disabled ? '#797979' : '#FFFFFF'};
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const ProjectCreateModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleCreateProject = async () => {
    if (title.trim()) {
      const token = localStorage.getItem('token');
      try {
        await axios.post('/api/projects/create', 
          { 
            projectName: title, 
            description: description || '' 
          }, 
          {
            headers: { 
              'Authorization': `Bearer ${token}` 
            }
          }
        );
        console.log('Project Created:', { title, description });
        handleCloseModal(); // 모달을 닫고 상태 초기화
        window.location.reload(); // 페이지 새로 고침
      } catch (error) {
        console.error('Error creating project:', error);
        // 오류 처리 로직 추가 가능
      }
    }
  };

  const handleCloseModal = () => {
    setTitle(''); // 제목 필드 초기화
    setDescription(''); // 설명 필드 초기화
    onClose(); // 모달 닫기
  };

  return (
    <ModalOverlay onClick={handleCloseModal}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Title>새 팀 프로젝트 만들기</Title>
        <Label>프로젝트 제목</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="프로젝트 제목을 입력하세요"
        />
        <Label>간략한 설명</Label>
        <TextArea
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="간략한 설명을 입력하세요"
        />
        <CreateButton
          onClick={handleCreateProject}
          disabled={!title.trim()}
        >
          팀프로젝트 만들기
        </CreateButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProjectCreateModal;
