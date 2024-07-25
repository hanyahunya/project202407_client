import React from 'react';
import styled from 'styled-components';

const TasksContainer = styled.div`
  padding: 1rem;
`;

const Tasks = () => {
  return (
    <TasksContainer>
      <h2>작업 목록</h2>
      {/* 작업 목록 내용을 여기에 추가 */}
    </TasksContainer>
  );
};

export default Tasks;
