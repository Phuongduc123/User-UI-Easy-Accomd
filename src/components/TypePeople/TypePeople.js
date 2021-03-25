import React, { useRef, useState } from "react";
import "./TypePeople.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
const { Search } = Input;

function TypePeople() {
  const formRef = useRef();
  let history=useHistory()

  return (
    <div className="TypePeople">
      <div className="background-typePeople">
        <img className="text-intro" src="./assets/textintro.png" />
        <img className="background-login-typePeople" src="./assets/backgroundlogin.png" />
      </div>
      <div className="who_are_you">
      Bạn là ai?
      </div>
      <div className="find-room-button" style={{display:"flex"}}>
        <div style={{flex:3}}/>
        <Button style={{flex:1,fontFamily:"Montserrat",borderRadius:"30px",border:"3px solid #43E5EF"}} onClick={()=>{
          history.push("/signup")
        }}>
        Người cần tìm phòng
        </Button>
        <div style={{flex:0.2}}></div>
        <Button style={{flex:1,fontFamily:"Montserrat",borderRadius:"30px",border:"3px solid #43E5EF"}} onClick={()=>{
          history.push("/tenant-signup")
        }}>
        Người cho thuê phòng
        </Button>
        <div style={{flex:3}}/>
      </div>
      <div style={{display:"flex"}}>
        <div style={{flex:1}}/>
        
        <img className="SceneTypePeople" style={{flex:3,width:"1rem"}} src="./assets/SceneTypePeople.png"/>
        <div style={{flex:1}}/>
      </div>
      <div style={{display:"flex"}}>
        <div style={{flex:1}}/>
        <img  style={{ flex:7,width:"1rem"}}  src="./assets/FootPage.png"/>
        <div style={{flex:0.5}}/>
      </div>
    </div>
  );
}

export default TypePeople;
