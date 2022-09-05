import React from "react";
import styled from 'styled-components';

const Input = ({ setMessage, sendMessage, message }) => (
  <OuterContainer>
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="전송하려는 메세지를 입력하세요"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyDown={(e) =>
          ({ key }) =>
            key === "Enter" ? sendMessage(e) : null}
      />
      <button className='sendButton' onClick={sendMessage}></button>
    </form>
  </OuterContainer>
);

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

`

export default Input;


