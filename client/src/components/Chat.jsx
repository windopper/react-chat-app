import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import TextContainer from "./TextContainer";

const ENDPOINT =
  "https://5000-windopper-reactchatapp-8ovb4t7lmhj.ws-us63.gitpod.io/";
let socket;

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [writingUsers, setWritingUsers] = useState([]);
  const writingTimeoutId = useRef(undefined);
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ user: "hi", text: "hi" }]);
  const innerContainerRef = useRef();

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(ENDPOINT, {
      transports: ["websocket"],
    });
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    console.log(writingUsers);
  }, [writingUsers]);

  useEffect(() => {
    socket.on("message", (m) => {
      setMessages((v) => [...v, m]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    socket.on("userWriting", ({ user }) => {
      if (name === user) return;
      setWritingUsers((v) => {
        if (!v.includes(user)) return [...v, user];
        return v;
      });
    });
    socket.on("userStopsWriting", ({ user }) => {
      if (name === user) return;
      setWritingUsers((u) => [...u.filter((v) => v !== user)]);
    });

    return () => {
      socket.off("message");
      socket.off("roomData");
      socket.off("userWriting");
      socket.off("userStopsWriting");
    };
  }, [name]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
      socket.emit("offWriteMessage");
    }
  };

  const oninputchange = ({ target: { value } }) => {
    if (value !== "") {
      socket.emit("onWriteMessage");
      if (writingTimeoutId.current) clearTimeout(writingTimeoutId.current);
      writingTimeoutId.current = setTimeout(() => {
        socket.emit("offWriteMessage");
        writingTimeoutId.current = undefined;
      }, 3000);
    }
    setMessage(value);
  };

  return (
    <OuterContainer>
      <InnerContainer className="chatInnerContainer" ref={innerContainerRef}>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} writingUsers={writingUsers} />
      </InnerContainer>
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        oninputchange={oninputchange}
      />
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
`;

const InnerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
  top: 0px;
  left: 0px;
  padding-bottom: 30px;
  background-color: #495057;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50%;
    background-color: white;
  }
`;

export default Chat;
