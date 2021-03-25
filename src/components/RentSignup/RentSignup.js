import React, { useRef, useState,useEffect } from "react";
import "./RentSignup.css";
import { Form, Input, Button, Checkbox, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import actions from "../../redux/actions/signup/index";
import { connect } from "react-redux";
import {useHistory} from "react-router";
const { TextArea } = Input;

function RentSignup(props) {
  const formRef = useRef();
  
  //history
  let history = useHistory()

  //state
  const [nameInput,setNameInput] = useState("");
  const [phoneInput,setPhoneInput] = useState("");
  const [addressInput,setAddressInput] = useState("");
  const [nameFollowCMTInput,setNameInputFollowCMTInput] = useState("");
  const [CMTInput,setCMTInput] = useState("");
  const [passwordInput,setPasswordInput] = useState("");
  const [emailInput,setEmailInput]=useState("");
  const [notification,setNotification]=useState([]);
  const [successSignup,setSuccessSignup]=useState("");
  

  //hook
  useEffect(() => {
    console.log(successSignup)  
    if (successSignup === true) {
      history.push("/login");
    }
  }, [successSignup]);

  const handleSignin = () => {
      props.postInformTenantToSignup(emailInput,nameInput,passwordInput,nameFollowCMTInput,CMTInput,addressInput,phoneInput,setSuccessSignup,setNotification);
  };

  return (
    <div className="RentSignup">
      <div className="background-rentSignup">
        <img
          className="background-login-rentSignup"
          src="./assets/backgroundlogin.png"
        />
        <img className="text-intro-rentSignup" src="./assets/textintro.png" />
      </div>
      <div className="form-rentSignup" style={{ display: "flex",marginBottom:"3rem",marginTop:"20px" }}>
        <div style={{ flex: 0.3 }} />
        <Form
          ref={formRef}
          name="normal_signup"
          initialValues={{ remember: true }}
          style={{
            flex: 3,
            background: "#e3fbfd",
            padding: "20px",
            paddingLeft: "100px",
            paddingRight: "100px",
            borderRadius: "30px",
            boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)",
            marginTop: "-7rem",
          }}
        >
          <Form.Item>
            <div>
              <div className="signin-text" style={{ textAlign: "center" }}>
                Đăng ký để <span style={{ color: "orange" }}>cho thuê </span>sớm
                nhất!
              </div>
              <div
                className="text-signin-intro"
                style={{ textAlign: "center" }}
              >
                Đăng ký Easy <span className="text-logo">Accomod</span> để có
                trải nghiệm tốt hơn.
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div
              style={{
                fontFamily: "Montserrat",
                fontStyle: "normal",
                color: "#38C5CE",
                fontSize: "28px",
              }}
            >
              Hồ sơ tài khoản
            </div>
          </Form.Item>
          <Form.Item
            name="name"
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 3 }}>
                <div className="text-password">Họ và tên</div>
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
                    setNameInput(value.target.value)
                  }}
                />
              </div>
              <div style={{ flex: 2 }} />
              <div style={{ flex: 3 }}>
                <div className="text-password">Địa chỉ email</div>
                <Input
                  style={{
                    borderRadius: "30px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                  }}
                  value={emailInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Địa chỉ email"
                  onChange={(value) => {
                    setEmailInput(value.target.value)
                  }}
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="phone"
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 3 }}>
                <div className="text-password">Số điện thoại</div>
                <Input
                  style={{
                    borderRadius: "30px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                  }}
                  value={phoneInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Số điện thoại"
                  onChange={(value) => {
                    setPhoneInput(value.target.value)
                  }}
                />
              </div>
              <div style={{ flex: 2 }} />
              <div style={{ flex: 3 }}>
                <div className="text-password">
                  Mật khẩu (tối thiểu 8 ký tự)
                </div>
                <Input
                  type="password"
                  style={{
                    borderRadius: "30px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                  }}
                  value={passwordInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Mật khẩu (tối thiểu 8 ký tự)"
                  onChange={(value) => {
                    setPasswordInput(value.target.value)
                  }}
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="sex"
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 3 }}>
                <div className="text-password">Giới tính</div>
                <Radio.Group
                  style={{
                    marginLeft: "20px",
                    marginTop: "10px",
                    fontFamily: "Montserrat",
                  }}
                >
                  <Radio
                    style={{ marginLeft: "20px", fontFamily: "Montserrat" }}
                    value={1}
                  >
                    Nam
                  </Radio>
                  <Radio
                    style={{ marginLeft: "20px", fontFamily: "Montserrat" }}
                    value={2}
                  >
                    Nữ
                  </Radio>
                  <Radio
                    style={{ marginLeft: "20px", fontFamily: "Montserrat" }}
                    value={3}
                  >
                    Khác
                  </Radio>
                </Radio.Group>
              </div>

            </div>
          </Form.Item>
          <Form.Item>
            <div
              style={{
                fontFamily: "Montserrat",
                fontStyle: "normal",
                color: "orange",
                fontSize: "28px",
              }}
            >
              Căn cước/ CMND
            </div>
          </Form.Item>
          <Form.Item
            name="nameCMT"
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 3 }}>
                <div className="text-password">Họ và tên theo CMTND</div>
                <Input
                  style={{
                    borderRadius: "30px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                  }}
                  value={nameFollowCMTInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Họ và tên theo CMTND"
                  onChange={(value) => {
                    setNameInputFollowCMTInput(value.target.value)
                  }}
                />
                <div className="text-password" style={{ marginTop: "15px" }}>
                  Số CMTND
                </div>
                <Input
                  style={{
                    borderRadius: "30px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                  }}
                  value={CMTInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Số CMTND"
                  onChange={(value) => {
                    setCMTInput(value.target.value)
                  }}
                />
              </div>
              <div style={{ flex: 2 }} />
              <div style={{ flex: 3 }}>
                <div className="text-password">Hộ khẩu thường trú</div>
                <TextArea
                  rows={4}
                  style={{
                    borderRadius: "20px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                    padding:"15px"
                  }}
                  value={addressInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Hộ khẩu thường trú (phường/ quận/ thành phố)"
                  onChange={(value) => {
                    setAddressInput(value.target.value)
                  }}
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div style={{display:"flex"}}>
              <div style={{flex:4}}></div>
              <Button
                style={{
                  color: "white",
                  flex:1,
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
              <div style={{flex:4}}></div>
            </div>
            {notification.map((noti,index)=>{
              return <div style={{color:"red",textAlign:"center"}} key={index}>{noti}</div>
            })}
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: "center" }}>
              Bạn đã có tài khoản Easy{" "}
              <span className="text-logo">Accomod</span>? <a onClick={()=>{history.push("/login")}}>Đăng nhập</a>
            </div>
          </Form.Item>
        </Form>
        <div style={{ flex: 0.3 }} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postInformTenantToSignup: (email,username,password,fullname,identication,address,phoneNumber,setSuccessSignup,setNotification) => {
      dispatch(actions.postInformTenantToSignup(email,username,password,fullname,identication,address,phoneNumber,setSuccessSignup,setNotification));
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(RentSignup);

