import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message'

const Messages = ({messages, name}) => {

  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  const messageElements = () => {
    if(messages.length === 0) return null;
    return (
      messages.map((message, i) => {
        if(i===messages.length-1) return (
          <div ref={lastMessageRef}>
            <Message message={message} name={name} key={i} />
          </div>
        );
        else return <Message message={message} name={name} key={i} />
      })
    )

  }

  return (
    <Wrapper>
      <div className="messages">
        {messageElements()}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: fit-content;

    #messages {
        position: relative;
        width: 100%;
        height: 100%;
    }
`

export default Messages;