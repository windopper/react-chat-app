import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from 'styled-components';

const Input = ({ setMessage, sendMessage, message }) => {

  const [inputDisabled, setInputDisabled] = useState(false);
  const [timeoutInCount, setTimeoutInCount] = useState(0);
  const [inputVibrating, setInputVibrating] = useState(false);
  const timeoutIdRef = useRef(undefined);

  const onkeydown = (e) => {
    const key = e.key;
    if(key === 'Enter') {
      sendMessage(e);

      if (timeoutIdRef.current) {
        if (timeoutInCount > 4) {
          setInputDisabled(true);
          setInputVibrating(true);
          setTimeout(() => setInputVibrating(false), 1000);
        }
        clearTimeout(timeoutIdRef.current);
      }
        timeoutIdRef.current = setTimeout(() => {
          timeoutIdRef.current = undefined;
          setInputDisabled(false);
          setTimeoutInCount(0);
        }, 4000);
      setTimeoutInCount(v => v+1);
    }
  };

  return (
    <OuterContainer>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="전송하려는 메세지를 입력하세요"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyDown={onkeydown}
          disabled={inputDisabled}
          vibrating={inputVibrating.toString()}
        />
        <button className="sendButton" onClick={sendMessage}></button>
      </form>
    </OuterContainer>
  );}

const OuterContainer = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  form {
    position: relative;
    bottom: 0px;
    margin: 5px;
    width: 95%;
    height: 90%;
    display: flex;
    justify-content: center;
  }

  input {
    position: relative;
    width: 100%;
    height: 90%;
    border-radius: 10px;
    background-color: #343a40;
    border: 8px solid #868e96;
    color: white;
    padding: 0px 5px;
    font-weight: 700;
    font-size: 1rem;
    outline: none;
  }

  .sendButton {
    display: none;
  }
`;

export default Input;


