import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "./Message";
import SomeoneWriting from "./SomeoneWriting";

const Messages = ({ messages, name, writingUsers }) => {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messageElements = () => {
    if (messages.length === 0) return null;

    // 받은 메시지 매핑
    const mappedMessage = messages.map((message, i) => {
      if (i === messages.length - 1)
        return (
          <div ref={lastMessageRef}>
            <Message message={message} name={name} key={i} />
          </div>
        );
      else return <Message message={message} name={name} key={i} />;
    });

    // 현재 내용을 만들고 있는 유저가 있으면 메시지 다음 칸에 누가 적고 있는지 표시
    if(writingUsers.length > 0) mappedMessage.push(<SomeoneWriting writingUsers={writingUsers} />)

    return mappedMessage;
  };

  return (
    <Wrapper>
      <div className="messages">{messageElements()}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;

  #messages {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

export default Messages;
