import React, { useEffect, useRef, useState } from "react";
import "./ChatAdmin.css";
import { Form, Input, Button, Carousel, message, Popover } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import CardFollowPlace from "../CardFollowPlace/CardFollowPlace";
import actions from "../../redux/actions/login/index";
import { connect } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";
import {
  getAllHost,
  getFullMessage,
  getIdChat,
  getIdChatAdmin,
} from "../../request";
import { w3cwebsocket as W3CWebsocket } from "websocket";
import { NotificationManager } from "react-notifications";

function ChatAdmin(props) {
  //state
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(200);
  const [idChat, setIdChat] = useState(0);
  const [allHost, setAllHost] = useState([]);
  const [hostname, setHostName] = useState("");
  const [fullMessage, setFullMessage] = useState([]);
  const [message, setMessage] = useState("");
  const [hiddenContent, setHiddenContent] = useState(true);
  const [websocketArr,setWebsocketArr] = useState([]);
  const [websocket, setWebsocket] = useState(
    new W3CWebsocket(`ws://127.0.0.1:8000/messages/${hostname}/thao/`)
  );
  const messagesEndRef = useRef(null);

  //hook
  useEffect(() => {
    getAllHost(setAllHost);
  }, []);

  useEffect(()=>{
    props.userList.map((user)=>{
      console.log(user)
      const wsk=new W3CWebsocket(`ws://127.0.0.1:8000/messages/${user.username}/thao/`)
      setWebsocketArr([...websocketArr,wsk])
    })
  },[props.userList])

  useEffect(() => {
    websocketArr.map((socket)=>{
      socket.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        NotificationManager.warning("",`${dataFromServer.username} nhắn tin cho bạn!`)
        console.log("-----!", dataFromServer);
      };
    })
    
  });

  useEffect(() => {

    websocket.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      setFullMessage([
        ...fullMessage,
        { message: JSON.stringify(dataFromServer) },
      ]);
      console.log("got reply!", dataFromServer);
    };
  });

  useEffect(() => {
    getIdChatAdmin({ hostname: hostname }, setIdChat);
  }, [hostname]);

  useEffect(() => {
    if (idChat !== 0) {
      getFullMessage({ id: idChat, start: start, end: end }, setFullMessage);
    }
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

      websocket.onopen = () => {
        console.log("socket open");
        console.log(fullMessage);
      };
  
      websocket.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        //   let fakeFullMessage=fullMessage;
        //   fakeFullMessage.push({message:JSON.stringify(dataFromServer)});
        //   setFullMessage(fakeFullMessage);
  
        console.log("got reply!", dataFromServer);
      };

    
  }, [websocketArr]);

  useEffect(() => {
    websocketArr.map((socket)=>{
      socket.onopen = () => {
        console.log("socket open");
        console.log(fullMessage);
      };
  
      socket.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        //   let fakeFullMessage=fullMessage;
        //   fakeFullMessage.push({message:JSON.stringify(dataFromServer)});
        //   setFullMessage(fakeFullMessage);
  
        console.log("got reply!", dataFromServer);
      };
    })
    
  }, [websocketArr]);

  //variable
  const contentOverHost = (
    <div>
      {allHost.map((host, index) => {
        return (
          <div
            className="host-name"
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setHostName(host.username);
              setWebsocket(
                new W3CWebsocket(
                  `ws://127.0.0.1:8000/messages/${host.username}/thao/`
                )
              );
            }}
          >
            {host.username}
          </div>
        );
      })}
    </div>
  );

  //function

  return (
    <div className="ChatAdmin">
      <div className="header-chat">
        <div className="icon-chat">
          <Popover content={contentOverHost}>
            <MessageOutlined />
          </Popover>
        </div>
        <div
          onClick={() => {
            setHiddenContent(!hiddenContent);
          }}
        >
          Tin nhắn
        </div>
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
                  type: "message",
                  role: "amdin",
                  msg: value.target.value,
                })
              );
              websocket.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                setFullMessage([
                  ...fullMessage,
                  { message: JSON.stringify(dataFromServer) },
                ]);
                console.log("got reply!", dataFromServer);
              };
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userList:state.login.userList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatAdmin);


//message
function Message(props) {
  return (
    <div style={{ display: "flex" }}>
      {props.admin === false ? (
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      ) : (
        <></>
      )}
      {props.admin === true ? <div style={{ flex: 1 }} /> : <></>}
      <div
        className="Message"
        style={{
          backgroundColor: props.admin === true ? "grey" : "rgba(0,0,0,0.1)",
          color: props.admin === true ? "white" : "grey",
          right: "0px",
          flex: 2,
        }}
      >
        {props.message}
      </div>
      {props.admin === false ? <div style={{ flex: 1 }} /> : <></>}
    </div>
  );
}
