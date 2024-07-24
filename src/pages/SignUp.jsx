import React, { useState, useRef } from 'react';
import axios from '../axiosConfig';
import { useLocation, useNavigate } from 'react-router-dom';

function SignUp() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleSignUp = async () => {
    try {
      await axios.post('/api/members/signUp', { email, nickname, password });
      await handleLogin();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/members/loginWithEmail', { email, password });
      const token = response.data.token;

      // 토큰을 localStorage에 저장
      localStorage.setItem('token', token);
      alert(token);

      // Projects 페이지로 이동
      navigate('/projects');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (field === 'nickname') {
        passwordInputRef.current.focus();
      } else if (field === 'password') {
        handleSignUp();
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, 'nickname')}
        placeholder="닉네임을 입력하세요"
      />
      <input
        type="password"
        value={password}
        ref={passwordInputRef}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, 'password')}
        placeholder="비밀번호를 입력하세요"
      />
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
}

export default SignUp;