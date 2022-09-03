import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
      <JoinOuterContainer>
        <JoinInnerContainer>
          <input
            placeholder="Your NickName"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Room Name"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
          <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}$room=${room}`}>
            <button type="submit">join</button>
          </Link>
        </JoinInnerContainer>
      </JoinOuterContainer>
    );
}

const JoinOuterContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: #495057;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const JoinInnerContainer = styled.div`
    position: relative;
    width: 300px;
    height: fit-content;
    padding: 20px 0px;
    margin: auto;
    border-radius: 10px;
    background-color: #343a40;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 80%;
        height: 50px;
        margin-top: 20px;
        border-radius: 5px;
        outline: none;
    }

    a {
        width: 80%;
        height: 50px;
        margin-top: 20px;
    }

    button {
        background-color: #5c7cfa;
        width: 100%;
        height: 100%;
        outline: none;
        border-radius: 5px;
        border: 0px;
        color: white;
        font-weight: 800;
        cursor: pointer;
        &:hover {
            background-color: #748ffc;
        }
    }
`

export default Join;

