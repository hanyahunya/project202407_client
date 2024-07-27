import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "../../axiosConfig";

const ModalContainer = styled.div`
  position: absolute;
  background-color: #202020;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  color: #d4d4d4;
  padding: 20px;
  width: 500px;
  height: 280px; /* Adjusted height to accommodate error message */
  z-index: 1002;
  top: ${(props) => props.top - 50}px;
  left: ${(props) => props.left}px;
`;

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column; /* Align items vertically */
  margin-bottom: 10px;
`;

const InputLabel = styled.div`
  min-width: 25%;
  margin-bottom: 5px; /* Spacing between label and input */
`;

const Input = styled.input`
  width: 456px;
  height: 44px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  color: #d4d4d4;
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
  background-color: ${(props) => (props.disabled ? "#555" : "#2383e2")};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const Dropdown = styled.div`
  position: absolute;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 5px;
  margin-top: 5px;
  padding: 5px 10px;
  color: #d4d4d4;
  width: 456px;
  left: 10px; /* Align with input */
  cursor: pointer; /* Make it clickable */
  top : 140px;
  
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
  margin-left: 10px;
`;

const AddMemberModal = ({ top, left, projectName, projectId, onClose }) => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [suggestions, setSuggestions] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const modalRef = useRef(null);

  const validateEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleInputChange = async (e) => {

    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setSuggestions(null);
    setShowErrorMessage(false);

    if (validateEmailFormat(inputEmail)) {
      setIsEmailValid(true);
      try {
        const response = await axios.get(
          `/api/members/findByEmail?email=${inputEmail}`
        );
        console.log(response.data.nickname);
        setSuggestions(response.data.nickname ? { nickname : response.data.nickname, email : inputEmail } : { email: inputEmail });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSuggestions({ email: inputEmail });
      }
    } else {
      setIsEmailValid(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (isEmailValid) {
        addEmail();
      } else {
        setShowErrorMessage(true);
      }
    }
  };

  const addEmail = () => {
    if (!emails.includes(email) && validateEmailFormat(email)) {
      setEmails([...emails, email]);
    }
    setEmail("");
    setSuggestions(null);
  };

  const handleRemoveEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleInvite = async () => {
    setShowErrorMessage(false);
    if (emails.length === 0) return;
    try {
      // 각 이메일에 대해 요청을 보냄
      await Promise.all(
        emails.map(async (email) => {
          await axios.post('/api/projects/invite', { "projectId" : projectId, "email": email });
        })
      );
  
      // 성공적으로 초대 요청을 보낸 후 이메일 배열을 초기화
      setEmails([]);
      setEmail("");
      setSuggestions(null);
      // 초대 완료 후 동작 (예: 모달 닫기)
      onClose();
    } catch (error) {
      // 요청 실패 시 에러를 콘솔에 출력하고, 에러 메시지를 표시
      console.error("Error sending invites:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleDropdownClick = () => {
    if (isEmailValid) {
      addEmail();
    } else {
      setShowErrorMessage(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
        {suggestions !== null && (
          <Dropdown onClick={handleDropdownClick}>
            {suggestions.nickname ? (
              <div>
                {suggestions.nickname} ( {suggestions.email} )
              </div>
            ) : (
              <div>{email}</div>
            )}
          </Dropdown>
        )}
        {showErrorMessage && (
          <ErrorMessage>올바른 이메일 형식을 입력하세요.</ErrorMessage>
        )}
      </InputContainer>
      <EmailTagContainer>
        {emails.map((email, index) => (
          <EmailTag key={index}>
            <span>{email}</span>
            <RemoveButton onClick={() => handleRemoveEmail(index)}>
              x
            </RemoveButton>
          </EmailTag>
        ))}
      </EmailTagContainer>
      <InviteButton disabled={emails.length === 0} onClick={handleInvite}>
        초대
      </InviteButton>
    </ModalContainer>
  );
};

export default AddMemberModal;
