import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import styled from 'styled-components';
import Message from './Message'

const Messages = ({messages, name}) => {
    return (
      <Wrapper>
        <ScrollToBottom className="messages">
          {messages.map((message, i) => (
              <Message message={message} name={name} key={i}/>
          ))}
        </ScrollToBottom>
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