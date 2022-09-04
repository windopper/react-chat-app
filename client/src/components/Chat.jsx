import { useEffect, useState } from "react";
import styled from 'styled-components';
import queryString from 'query-string'
import io from 'socket.io-client';
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import TextContainer from "./TextContainer";

const ENDPOINT = 'https://5000-windopper-reactchatapp-8ovb4t7lmhj.ws-us63.gitpod.io/';
let socket;

function Chat() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{user: 'hi', text: 'hi'}]);

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);
        console.log(queryString.parse(window.location.search))
        socket = io(ENDPOINT, {
            transports: ["websocket"],
        })
        setRoom(room);
        setName(name);

        socket.emit('join', {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        })
    }, [ENDPOINT, window.location.search])

    useEffect(() => {
        socket.on('message', (m) => {
            setMessages((v) => [...v, m])
        })
        socket.on('roomData', ({users}) => {
            setUsers(users);
        })
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    return (
      <OuterContainer>
        <InnerContainer>
          <InfoBar room={room} />
          <Messages messages={messages} name={name}/>
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </InnerContainer>
        <TextContainer users={users} />
      </OuterContainer>
    );
}

const OuterContainer = styled.div`
    position: absolute;
    background-color: #343a40;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
`

const InnerContainer = styled.div`
    position: absolute;
    width: 100%;
    height: calc(100% - 50px);
    top: 0px;
    left: 0px;
    background-color: #495057;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    overflow-x: hidden;
`

export default Chat;