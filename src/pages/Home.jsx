import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212; // 어두운 회색 배경
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #e0e0e0; // 밝은 회색 텍스트
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  color: #ffffff; // 흰색 텍스트
  background-color: #333333; // 어두운 회색 배경
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #444444; // 더 어두운 회색 배경
  }
`;

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Title>Welcome to Our App</Title>
      <Button onClick={handleGetStarted}>Get Started</Button>
    </Container>
  );
}

export default Home;
