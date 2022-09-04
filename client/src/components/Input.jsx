import React from "react";

const Input = ({ setMessage, sendMessage, message }) => (
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
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      전송
    </button>
  </form>
);

export default Input;
