import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { Form, Input, Button, Carousel, message } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import CardFollowPlace from "../CardFollowPlace/CardFollowPlace";
import Avatar from "antd/lib/avatar/avatar";
import { getFullMessage, getIdChat } from "../../request";
import { w3cwebsocket as W3CWebsocket } from "websocket";

function Chat() {
  //state
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(200);
  const [idChat, setIdChat] = useState(0);
  const [fullMessage, setFullMessage] = useState([]);
  const [message, setMessage] = useState("");
  const [hiddenContent, setHiddenContent] = useState(true);
  const [websocket, setWebsocket] = useState(
    new W3CWebsocket(
      `ws://127.0.0.1:8000/messages/${localStorage.getItem(
        "Rooms_username"
      )}/thao/`
    )
  );
  const messagesEndRef = useRef(null);

  //hook
  useEffect(() => {
    websocket.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      setFullMessage([
        ...fullMessage,
        { message: JSON.stringify(dataFromServer) },
      ]);
    };
  });

  useEffect(() => {
    getIdChat(setIdChat);
    setWebsocket(
      new W3CWebsocket(
        `ws://127.0.0.1:8000/messages/${localStorage.getItem(
          "Rooms_username"
        )}/thao/`
      )
    );
  }, []);

  useEffect(() => {
      getFullMessage({ id: idChat, start: start, end: end }, setFullMessage);
  }, [idChat]);

  useEffect(() => {
    console.log(fullMessage);
  }, [fullMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (hiddenContent === false) scrollToBottom();
  }, [fullMessage]);

  useEffect(() => {
    if (hiddenContent === false) scrollToBottom();
  }, [hiddenContent]);
  
  useEffect(() => {
    websocket.onopen = () => {
      console.log("websocket open");
    };

    websocket.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply!", dataFromServer);
    };
    
  }, [websocket]);

  //function

  return (
    <div className="Chat">
      <div
        className="header-chat"
        onClick={() => {
          setHiddenContent(!hiddenContent);
        }}
      >
        <div className="icon-chat">
          <MessageOutlined />
        </div>
        <div>Tin nhắn</div>
        {hiddenContent === false ? (
          <div
            className="zoom-in-chat"
            onClick={() => {
              setHiddenContent(true);
            }}
          >
            _
          </div>
        ) : (
          <></>
        )}
      </div>
      {hiddenContent === false ? (
        <div className="body-chat">
          <div className="content-chat">
            {fullMessage.map((message, index) => {
              const mess = JSON.parse(message.message);
              return (
                <div key={index}>
                  <Message
                    message={mess.msg}
                    admin={mess.role === "host" ? false : true}
                  />
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          <Input
            placeholder="Nhập tin nhắn của bạn"
            value={message}
            onChange={(value) => setMessage(value.target.value)}
            onPressEnter={(value) => {
              setMessage("");
              websocket.send(
                JSON.stringify({
                  username:localStorage.getItem("Rooms_username"),
                  type: "message",
                  role: "host",
                  msg: value.target.value,
                })
              );

            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Chat;

function Message(props) {
  return (
    <div style={{ display: "flex" }}>
      {props.admin === true ? (
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      ) : (
        <></>
      )}
      {props.admin === false ? <div style={{ flex: 1 }} /> : <></>}
      <div
        className="Message"
        style={{
          backgroundColor: props.admin === false ? "grey" : "rgba(0,0,0,0.1)",
          color: props.admin === false ? "white" : "grey",
          right: "0px",
          flex: 2,
        }}
      >
        {props.message}
      </div>
      {props.admin === true ? <div style={{ flex: 1 }} /> : <></>}
    </div>
  );
}
