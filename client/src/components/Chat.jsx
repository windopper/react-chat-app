import { useEffect, useState } from "react";
import queryString from 'query-string'
import io from 'socket.io-client';

const ENDPOINT = 'https://5000-windopper-reactchatapp-8ovb4t7lmhj.ws-us63.gitpod.io/';
let socket;

function Chat() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);
        socket = io(ENDPOINT);

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
            setMessage((m) => [...messages, m])
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
        <div>
            채팅
        </div>

    )
}

export default Chat;