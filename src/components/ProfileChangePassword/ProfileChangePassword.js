import React, { useRef, useState } from "react";
import "./ProfileChangePassword.css";
import { Form, Input, Button } from "antd";
import actions from "../../redux/actions/profile/index";
import { connect } from "react-redux";
import SideMenu from "../SideMenu/SideMenu.js";

function ProfileChangePassword(props) {
  const formRef = useRef();
  const [passwordInput, setPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [newPasswordAgainInput, setNewPasswordAgainInput] = useState("");
  const [notification, setNotification] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleSignin = () => {
    if(newPasswordAgainInput===newPasswordInput){
      props.putChangePassword(passwordInput, newPasswordInput, setNotification);
    } else{
      setNotification(true);
    }
    
  };

  return (
    <div className="Profile">
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
          <div className="black-text">Thay đổi mật khẩu</div>
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
          <SideMenu type="account" />
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
              <div className="text-password">Mật khẩu hiện tại</div>
              <Input
                style={{
                  borderRadius: "5px",
                }}
                type="password"
                value={passwordInput}
                placeholder="Mật khẩu hiện tại"
                onChange={(value) => {
                  setPasswordInput(value.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <div className="text-password">Mật khẩu mới</div>
              <Input
                style={{
                  borderRadius: "5px",
                }}
                type="password"
                value={newPasswordInput}
                placeholder="Mật khẩu mới"
                onChange={(value) => {
                  setNewPasswordInput(value.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <div className="text-password">Nhập lại mật khẩu</div>
              <Input
                style={{
                  borderRadius: "5px",
                }}
                type="password"
                value={newPasswordAgainInput}
                placeholder="Nhập lại mật khẩu"
                onChange={(value) => {
                  setNewPasswordAgainInput(value.target.value);
                }}
              />
              {notification === true ? (
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  Kiểm tra lại thông tin của bạn
                </div>
              ) : (
                <></>
              )}
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 5 }} />
                <Button
                  style={{
                    flex: 1,
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
                  Đăng ký
                </Button>
                <div style={{ flex: 5 }} />
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    putChangePassword: (password, newPassword, setNotification) => {
      dispatch(
        actions.putChangePassword(password, newPassword, setNotification)
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileChangePassword);
