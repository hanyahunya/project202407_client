import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: absolute;
  background-color: #202020;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  color: #D4D4D4;
  padding: 20px;
  width: 500px;
  height: 190px;
  z-index: 1002;
  top: ${props => props.top- 50}px;
  left: ${props => props.left}px;
`;

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const InputLabel = styled.div`
  min-width: 25%;
`;

const Input = styled.input`
  width: 456px;
  height: 44px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #D4D4D4;
  background-color: #333;
  margin-left: 10px;
`;

const EmailTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const EmailTag = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 6px;
  font-size: 14px;
  background: rgba(246, 192, 80, 0.26);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  margin: 3px 6px 3px 0px;
`;

const RemoveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  cursor: pointer;
`;

const InviteButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 52px;
  height: 32px;
  background-color: ${props => props.disabled ? '#555' : '#2383e2'};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const AddMemberModal = ({ top, left, projectName, onClose }) => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && email) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const handleRemoveEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleInvite = () => {
    // 초대 API 호출 로직 추가
    console.log('Invite sent to:', emails);
    onClose();
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
      <Title>초대할 팀프로젝트: {projectName}</Title>
      <InputContainer>
        <InputLabel>초대할 팀프로젝트:</InputLabel>
        <Input 
          type="text" 
          value={email} 
          onChange={handleInputChange} 
          onKeyPress={handleKeyPress}
        />
      </InputContainer>
      <EmailTagContainer>
        {emails.map((email, index) => (
          <EmailTag key={index}>
            <span>{email}</span>
            <RemoveButton onClick={() => handleRemoveEmail(index)}>x</RemoveButton>
          </EmailTag>
        ))}
      </EmailTagContainer>
      <InviteButton 
        disabled={emails.length === 0} 
        onClick={handleInvite}
      >
        초대
      </InviteButton>
    </ModalContainer>
  );
};

export default AddMemberModal;
