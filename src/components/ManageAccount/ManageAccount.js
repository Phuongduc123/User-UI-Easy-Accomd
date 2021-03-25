import React, { useRef, useState } from "react";
import "./ManageAccount.css";
import { Form, Input, Button, Checkbox, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SideMenu from "../SideMenu/SideMenu.js";
const { Search } = Input;
const { TextArea } = Input;

function ManageAccount() {
  const formRef = useRef();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleSignin = () => {};

  return (
    <div className="ManageAccount">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }} />
        <ul className="list-profile" style={{ flex: 14 }}>
          <li className="option">
            <a>Tài khoản</a>
          </li>
          <li className="option" style={{ opacity: "0.5" }}>
            <a>Yêu thích</a>
          </li>
          <li className="option" style={{ opacity: "0.5" }}>
            <a>Thông báo</a>
          </li>
        </ul>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.4 }} />
        <div style={{ flex: 14, display: "flex" }}>
          <div className="orange-text">{localStorage.getItem("Rooms_username")}</div>
          <div className="I" />
          <div className="black-text">Thông tin tài khoản</div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.4 }} />
        <div style={{ flex: 14, marginTop: "15px" }}>
          Hãy cập nhật thông tin cá nhân thật chính xác nhé!
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }} />
        <div className="sidebar-div" style={{ flex: 2.2, height: "70%" }}>
            <SideMenu type="account"/>
        </div>

        <div style={{ flex: 0.2 }} />
        <div className="sidebar-div" style={{ flex: 7.8, padding: "30px" }}>
          <Form
            ref={formRef}
            name="normal_signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item>
              <div className="text-password" style={{textAlign:"center"}}>Bạn có muốn xóa tài khoản không?</div>
              <div style={{display:"flex", marginTop:"30px"}}>
                <div style={{flex:3}}/>
                <div style={{flex:1}}>
                <Button
                  style={{
                    flex: 1,
                    width:"5rem",
                    fontFamily: "Montserrat",
                    borderRadius: "30px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                  type="ghost"
                  htmlType="submit"
                  className="signup-form-button"
                  onClick={() => {
                    handleSignin();
                  }}
                >
                  Có
                </Button>
                </div>
                <div style={{flex:2}}/>
                <div style={{flex:1}}>
                <Button
                  style={{
                    flex: 1,
                    width:"5rem",
                    color: "white",
                    fontFamily: "Montserrat",
                    borderRadius: "30px",
                    backgroundColor: "#43E5EF",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                  type="ghost"
                  htmlType="submit"
                  className="signup-form-button"
                  onClick={() => {
                    handleSignin();
                  }}
                >
                  Không
                </Button>
                </div>
                <div style={{flex:3}}/>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div style={{ flex: 2 }} />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 0 }} />
        <img
          style={{ flex: 7, width: "1rem" }}
          className="Footer"
          src="./assets/FootPage.png"
        />
        <div style={{ flex: 0 }} />
      </div>
    </div>
  );
}

export default ManageAccount;
