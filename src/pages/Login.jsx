import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput_t';
import AuthCodeInput from '../components/AuthCodeInput';

function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isExistingMember, setIsExistingMember] = useState(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showAuthCodeInput, setShowAuthCodeInput] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식을 입력하세요');
      return;
    }
    
    setEmailError('');
    try {
      const response = await axios.post('/api/members/getLoginOptions', { email });
      if (response.data.isExistingMember) {
        setIsExistingMember(true);
        setShowPasswordInput(true);
        setShowAuthCodeInput(false);
      } else {
        setIsExistingMember(false);
        setShowAuthCodeInput(true);
        setShowPasswordInput(false);
        await axios.post('/api/members/sendAuthCode', { email });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setShowPasswordInput(false);
    setShowAuthCodeInput(false);
    setEmailError('');
  }, [email]);

  const handleLoginSuccess = (token) => {
    // 토큰을 localStorage에 저장
    alert(`ㄴㄴㄴ${token}`);
    console.log(token);
    localStorage.setItem('token', token);
    // Projects 페이지로 이동
    navigate('/projects');
  };

  return (
    <div>
      <EmailInput email={email} setEmail={setEmail} onSubmit={handleEmailSubmit} emailError={emailError} />
      {showPasswordInput && <PasswordInput email={email} onSuccess={handleLoginSuccess} />}
      {showAuthCodeInput && <AuthCodeInput email={email} />}
    </div>
  );
}

export default Login;