import React from 'react';
import styled from 'styled-components'

const SomeoneWriting = ({writingUsers}) => {
    
    const mappedWritingUsers = () => {
        let content = '';
        if(writingUsers.length < 4) {
            const [u1, u2, u3] = writingUsers;
            content = u1 + `${u2 ? `, ${u2}` : ''}` + `${u3 ? `, ${u3}` : ''} 님이 글을 작성중...`
        }
        else {
            const [u1, u2, u3] = writingUsers;
            content = u1 + ', '+ u2 + ', ' + u3 + `외 ${writingUsers.length - 3}명이 글을 작성중...`
        }
        return <Text>{content}</Text>
    }

    return (
        <OuterContainer>
            <RightContainer>
                {mappedWritingUsers()}
            </RightContainer>
        </OuterContainer>
    )
}

const OuterContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    
`

const RightContainer = styled.div`
    position: relative;
    width: fit-content;
    max-width: 80%;
    border-radius: 10px;
    margin: 10px;
    background-color: #adb5bd;
    opacity: 0.5;
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    align-items: center;
    justify-content: flex-end;
`

const Text = styled.div`
    padding: 5px;
    color: black;
    font-weight: 500;
`

export default SomeoneWriting;