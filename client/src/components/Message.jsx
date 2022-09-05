import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Message = ({message: {text, user}, name}) => {
    let isSendByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();
    const ref = useRef();

    useEffect(() => {
      // ref.current?.scrollIntoView({behavior: 'smooth'})
    }, []);

    if(user === trimmedName) {
        isSendByCurrentUser = true;
    }

    return isSendByCurrentUser ? (
      <OuterContainer ref={ref}>
        <LeftContainer>
          <UserName>{trimmedName}</UserName>
          <UserMessage>{text}</UserMessage>
        </LeftContainer>
      </OuterContainer>
    ) : (
      <OuterContainer ref={ref}>
        <RightContainer>
          <UserMessage>{text}</UserMessage>
          <UserName>{user}</UserName>
        </RightContainer>
      </OuterContainer>
    );
}

const OuterContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;

    > div {
       margin: 10px; 
    }

`

const LeftContainer = styled.div`
    position: relative;
    width: fit-content;
    max-width: 80%;
    border-radius: 10px;
    background-color: #c5f6fa;
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    align-items: center;
`

const RightContainer = styled.div`
    position: relative;
    width: fit-content;
    max-width: 80%;
    border-radius: 10px;
    background-color: #c3fae8;
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    align-items: center;
    justify-content: flex-end;
`

const UserName = styled.div`
    font-weight: lighter;
    margin: 5px 20px;
`

const UserMessage = styled.div`
    font-weight: 800;
    margin: 5px 20px;
`

export default React.memo(Message);