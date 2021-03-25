/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import actions from "../../redux/actions/login/index";
import { connect } from "react-redux";
import { useHistory } from "react-router";

function Login(props) {
  const formRef = useRef();
  //history
  let history = useHistory();

  //state
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [logged, setLogged] = useState(false);

  //hook
  useEffect(() => {
    if(logged===true){
      history.push("/home");
    }
      
  }, [logged]);

  const handleLogin = () => {
    props.postToLogin(emailInput, passwordInput, setLogged);
  };

  return (
    <div className="Login">
      <div style={{ display: "flex" }}>
        <div className="background">
          <img className="text-intro" src="./assets/textintro.png" />
          <img
            className="background-login"
            src="./assets/backgroundlogin.png"
          />
        </div>
      </div>

      <div className="scene">
        <img className="loginscene" src="./assets/loginscene.png" />
      </div>
      <div className="form" style={{ display: "flex", height: "30rem",width:"370px",height:"450px",marginTop:"-80px",marginRight:"50px",padding:"10px 20px" }}>
        <Form
          ref={formRef}
          name="normal_login"
          initialValues={{ remember: true }}
        >
          <Form.Item>
            <div>
              <div className="signin-text">Đăng nhập</div>
              <div className="text-signin-intro">
                Đăng nhập Easy <span className="text-logo">Accomod</span> để có
                trải nghiệm tốt hơn.
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: emailInput === "",
                message: "Please input your Email!",
              },
            ]}
          >
            <div className="text-email">Địa chỉ email</div>
            <Input
              type={"email"}
              style={{
                borderRadius: "30px",
                background: "#e3fbfd",
                border: "2px solid #43e5ef",
                boxSizing: "border-box",
              }}
              value={emailInput}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(value) => {
                setEmailInput(value.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: passwordInput === "",
                message: "Please input your Password!",
              },
            ]}
          >
            <div className="text-password">Mật khẩu</div>
            <Input
              style={{
                borderRadius: "30px",
                background: "#e3fbfd",
                border: "2px solid #43E5EF",
                boxSizing: "border-box",
              }}
              value={passwordInput}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(value) => {
                setPasswordInput(value.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                color: "white",
                fontFamily: "Montserrat",
                borderRadius: "30px",
                backgroundColor: "#43E5EF",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                marginLeft: "35%",
              }}
              type="ghost"
              htmlType="submit"
              className="login-form-button"
              onClick={() => {
                handleLogin();
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="text-signin-intro" style={{ textAlign: "center" }}>
              Bạn quên mật khẩu? <a>Nhấn vào đây</a>
            </div>
            <div className="text-signin-intro" style={{ textAlign: "center" }}>
              Bạn chưa có tài khoản Easy{" "}
              <span className="text-logo">Accomod</span>? <a>Đăng ký</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    postToLogin: (email, password, setLogged) => {
      dispatch(actions.postToLogin(email, password, setLogged));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
