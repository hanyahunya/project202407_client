import React, { useState } from 'react';
import axios from '../axiosConfig';

function PasswordInput({ email, onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 에러 메시지 상태 추가

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/members/loginWithEmail', { email, password });
      const token = response.data.token;

      if (response.status === 200) {
        // JWT 토큰을 localStorage에 저장
        localStorage.setItem('token', token);

        // onSuccess 콜백에 토큰을 전달
        onSuccess(token);

        // 로그인 성공 시 에러 메시지 초기화
        setError('');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('비밀번호가 잘못되었습니다.'); // 에러 메시지 설정
      } else {
        setError('로그인 중 오류가 발생했습니다.'); // 다른 오류에 대한 메시지 설정
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(); // 엔터키를 누르면 handleLogin 호출
    }
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown} // 엔터키 이벤트 처리
        placeholder="비밀번호를 입력하세요"
      />
      <button onClick={handleLogin}>로그인</button>
      {error && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
}

export default PasswordInput;