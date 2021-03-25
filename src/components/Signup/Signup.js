/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useEffect } from "react";
import "./Signup.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import actions from "../../redux/actions/signup/index";
import { connect } from "react-redux";
import { useHistory } from "react-router";
const { Search } = Input;

function Signup(props) {
  //refs
  const formRef = useRef();
  //history
  let history = useHistory();

  //state
  const [emailInput, setEmailInput] = useState("");
  const [telephoneInput, setTelephoneInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordAgainInput, setPasswordAgainInput] = useState("");
  const [notification, setNotification] = useState([]);
  const [successSignup, setSuccessSignup] = useState(false);

  //hook
  useEffect(() => {
    if (successSignup === true) {
      history.push("/login");
    }
  }, [successSignup]);

  //function handle
  const handleSignin = () => {
    if (passwordInput === passwordAgainInput) {
      props.postInformToSignup(
        emailInput,
        nameInput,
        passwordInput,
        setSuccessSignup,
        setNotification
      );
    } else {
      setPasswordAgainInput("");
    }
  };

  return (
    <div className="Signup">
      <div className="background">
        <img className="text-intro-signup" src="./assets/textintro.png" />
        <img className="background-signup" src="./assets/backgroundlogin.png" />
      </div>
      <div className="scene">
        <img className="signupscene" src="./assets/loginscene.png" />
      </div>
      <div className="form" style={{width:"370px",height:"700px",marginTop:"-100px",marginRight:"60px",padding:"0px 20px"}}>
        <Form
          ref={formRef}
          name="normal_signup"
          initialValues={{ remember: true }}
        >
          <Form.Item>
            <div>
              <div className="signin-text">
                Đăng ký để <span style={{ color: "orange" }}>tìm phòng</span>{" "}
                ngay hôm nay!
              </div>
              <div className="text-signin-intro">
                Đăng ký Easy <span className="text-logo">Accomod</span> để có
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
            name="name"
            rules={[
              {
                required: nameInput === "",
                message: "Please input your name!",
              },
            ]}
          >
            <div className="text-password">Tên đăng nhập</div>
            <Input
              style={{
                borderRadius: "30px",
                background: "#e3fbfd",
                border: "2px solid #43E5EF",
                boxSizing: "border-box",
              }}
              value={nameInput}
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Họ và tên"
              onChange={(value) => {
                setNameInput(value.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: passwordInput === "",
                message: "Please input your password!",
              },
            ]}
          >
            <div className="text-password">Mật khẩu (tối thiểu 8 ký tự)</div>
            <Input
              style={{
                borderRadius: "30px",
                background: "#e3fbfd",
                border: "2px solid #43E5EF",
                boxSizing: "border-box",
              }}
              value={passwordInput}
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              onChange={(value) => {
                setPasswordInput(value.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="passwordAgain"
            rules={[
              {
                required: passwordAgainInput === "",
                message: "Please input your password Again!",
              },
            ]}
          >
            <div className="text-password">Xác nhận mật khẩu</div>
            <Input
              style={{
                borderRadius: "30px",
                background: "#e3fbfd",
                border: "2px solid #43E5EF",
                boxSizing: "border-box",
              }}
              value={passwordAgainInput}
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Xác nhận mật khẩu"
              onChange={(value) => {
                setPasswordAgainInput(value.target.value);
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
              className="signup-form-button"
              onClick={() => {
                handleSignin();
              }}
            >
              Đăng ký
            </Button>

            {/* notification when signup isnt success */}
            {notification.map((noti, index) => {
              return (
                <div key={index} style={{ color: "red", textAlign: "center" }}>
                  {noti}
                </div>
              );
            })}
          </Form.Item>
          <Form.Item>
            <div className="text-signin-intro">
              Bạn đã có tài khoản Easy{" "}
              <span className="text-logo">Accomod</span>? <a onClick={()=>{history.push("/login")}}>Đăng nhập</a>
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
    postInformToSignup: (
      email,
      username,
      password,
      setSuccessSignup,
      setNotification
    ) => {
      dispatch(
        actions.postInformToSignup(
          email,
          username,
          password,
          setSuccessSignup,
          setNotification
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
