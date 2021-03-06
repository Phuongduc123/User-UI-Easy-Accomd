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
                ????ng k?? ????? <span style={{ color: "orange" }}>cho thu?? </span>s???m
                nh???t!
              </div>
              <div
                className="text-signin-intro"
                style={{ textAlign: "center" }}
              >
                ????ng k?? Easy <span className="text-logo">Accomod</span> ????? c??
                tr???i nghi???m t???t h??n.
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
              H??? s?? t??i kho???n
            </div>
          </Form.Item>
          <Form.Item
            name="name"
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 3 }}>
                <div className="text-password">H??? v?? t??n</div>
                <Input
                  style={{
                    borderRadius: "30px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                  }}
                  value={nameInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="H??? v?? t??n"
                  onChange={(value) => {
                    setNameInput(value.target.value)
                  }}
                />
              </div>
              <div style={{ flex: 2 }} />
              <div style={{ flex: 3 }}>
                <div className="text-password">?????a ch??? email</div>
                <Input
                  style={{
                    borderRadius: "30px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                  }}
                  value={emailInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="?????a ch??? email"
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
                <div className="text-password">S??? ??i???n tho???i</div>
                <Input
                  style={{
                    borderRadius: "30px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                  }}
                  value={phoneInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="S??? ??i???n tho???i"
                  onChange={(value) => {
                    setPhoneInput(value.target.value)
                  }}
                />
              </div>
              <div style={{ flex: 2 }} />
              <div style={{ flex: 3 }}>
                <div className="text-password">
                  M???t kh???u (t???i thi???u 8 k?? t???)
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
                  placeholder="M???t kh???u (t???i thi???u 8 k?? t???)"
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
                <div className="text-password">Gi???i t??nh</div>
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
                    N???
                  </Radio>
                  <Radio
                    style={{ marginLeft: "20px", fontFamily: "Montserrat" }}
                    value={3}
                  >
                    Kh??c
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
              C??n c?????c/ CMND
            </div>
          </Form.Item>
          <Form.Item
            name="nameCMT"
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 3 }}>
                <div className="text-password">H??? v?? t??n theo CMTND</div>
                <Input
                  style={{
                    borderRadius: "30px",
                    background: "#e3fbfd",
                    border: "2px solid #43E5EF",
                    boxSizing: "border-box",
                  }}
                  value={nameFollowCMTInput}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="H??? v?? t??n theo CMTND"
                  onChange={(value) => {
                    setNameInputFollowCMTInput(value.target.value)
                  }}
                />
                <div className="text-password" style={{ marginTop: "15px" }}>
                  S??? CMTND
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
                  placeholder="S??? CMTND"
                  onChange={(value) => {
                    setCMTInput(value.target.value)
                  }}
                />
              </div>
              <div style={{ flex: 2 }} />
              <div style={{ flex: 3 }}>
                <div className="text-password">H??? kh???u th?????ng tr??</div>
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
                  placeholder="H??? kh???u th?????ng tr?? (ph?????ng/ qu???n/ th??nh ph???)"
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
                ????ng k??
              </Button>
              <div style={{flex:4}}></div>
            </div>
            {notification.map((noti,index)=>{
              return <div style={{color:"red",textAlign:"center"}} key={index}>{noti}</div>
            })}
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: "center" }}>
              B???n ???? c?? t??i kho???n Easy{" "}
              <span className="text-logo">Accomod</span>? <a onClick={()=>{history.push("/login")}}>????ng nh???p</a>
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

