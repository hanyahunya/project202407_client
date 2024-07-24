import React, { useState, useEffect } from 'react';

function EmailInput({ email, setEmail, onSubmit }) {
  const [showContinueButton, setShowContinueButton] = useState(true);
  const [emailError, setEmailError] = useState('');

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // 버튼 클릭 및 엔터키 제출 처리
  const handleSubmit = () => {
    if (validateEmail(email)) {
      onSubmit(); // 이메일이 올바르면 onSubmit 호출
      setShowContinueButton(false); // 버튼 숨기기
      setEmailError(''); // 에러 메시지 초기화
    } else {
      setEmailError('올바른 이메일 형식을 입력하세요'); // 에러 메시지 설정
      setShowContinueButton(true); // 버튼 계속 보이게
    }
  };

  // 이메일 입력 값 변경 시 버튼 상태 업데이트
  useEffect(() => {
    if (email.length > 0) {
      setShowContinueButton(true); // 이메일이 비어있지 않으면 버튼 보이기
    } else {
      setShowContinueButton(true); // 이메일이 비어있으면 버튼 보이기
    }
  }, [email]);

  // 이메일 입력 필드의 키다운 이벤트 핸들러
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼 제출 방지 (만약 폼 내에서 엔터키를 누를 경우)
      handleSubmit(); // 엔터키 눌렀을 때 handleSubmit 호출
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 추가
        placeholder="이메일을 입력하세요"
      />
      {emailError && (
        <p style={{ color: '#FE989A', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          {emailError}
        </p>
      )}
      {showContinueButton && (
        <button onClick={handleSubmit}>계속</button> // 버튼 상태에 따라 표시
      )}
    </div>
  );
}

export default EmailInput;