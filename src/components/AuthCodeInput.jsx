import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function AuthCodeInput({ email }) {
  const [authCode, setAuthCode] = useState('');
  const [countdown, setCountdown] = useState(30); // 카운트다운 초기값
  const [isResendEnabled, setIsResendEnabled] = useState(false); // "다시 보내기" 활성화 상태
  const navigate = useNavigate();

  // 카운트다운 타이머
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else {
      setIsResendEnabled(true); // 타이머가 0이 되면 "다시 보내기" 버튼 활성화
    }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, [countdown]);

  // 인증 코드 제출 처리
  const handleAuthCodeSubmit = async () => {
    try {
      const response = await axios.post('/api/members/validateAuthCode', { email, authCode });
      if (response.data.isEqualCodes) {
        navigate('/signup', { state: { email } });
      } else {
        alert('Invalid auth code');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 인증 코드 재전송
  const handleResendCode = async () => {
    try {
      setCountdown(30); // 카운트다운을 30초로 초기화
      setIsResendEnabled(false); // "다시 보내기" 버튼 비활성화
      await axios.post('/api/members/sendAuthCode', { email });
    } catch (error) {
      console.error(error);
    }
  };

  // 키다운 이벤트 핸들러
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼 제출 방지 (만약 폼 내에서 엔터키를 누를 경우)
      handleAuthCodeSubmit(); // 엔터키 눌렀을 때 handleAuthCodeSubmit 호출
    }
  };

  return (
    <div>
      <input
        type="text"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
        onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 추가
        placeholder="승인코드를 입력하세요"
      />
      <button onClick={handleAuthCodeSubmit}>계속</button>
      <p>
        수신함에 인증코드를 보내드렸습니다.
        {countdown > 0 && ` ${countdown}초 후에`}
        {' '}
        <span
          onClick={isResendEnabled ? handleResendCode : undefined}
          style={{ color: isResendEnabled ? 'blue' : 'gray', cursor: isResendEnabled ? 'pointer' : 'default' }}
        >
          다시 보내기
        </span>
      </p>
    </div>
  );
}

export default AuthCodeInput;