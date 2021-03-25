import React, { useEffect, useRef, useState } from "react";
import "./UpdatePost.css";
import { Form, Input, Button, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import actions from "../../redux/actions/post/index";
import { connect } from "react-redux";
import SelectionProfile from "../SelectionProfile/SelectionProfile";
import Modal from "antd/lib/modal/Modal";
import { createNotification } from "../../utils/notification";
import { NotificationManager } from "react-notifications";
import { getRoomDetail, updatePost } from "../../request";
import { useLocation } from "react-router";
const { TextArea } = Input;
const { Option } = Select;

function UpdatePost(props) {
  const location = useLocation();
  const [postDetail, setPostDetail] = useState({});
  const [visible,setVisible] = useState(false);
  const [detailAddress, setDetailAddress] = useState("");
  const [describeAddress, setDescribeAddress] = useState("");
  const [roomType, setRoomType] = useState("phòng trọ");
  const [rentTime, setRentime] = useState("tháng");
  const [numberOfRoom, setNumberOfRoom] = useState(1);
  const [price, setPrice] = useState(1000000);
  const [square, setSquare] = useState(0);
  const [withOwner, setWithOwner] = useState("False");
  const [bathroomType, setBathRoomType] = useState("khép kín");
  const [kitchen, setKitchen] = useState("khu bếp riêng");
  const [airconditioner, setAirconditioner] = useState("False");
  const [balcony, setBalcony] = useState("False");
  const [electric, setElectric] = useState(0);
  const [water, setWater] = useState(0);
  const [heater, setHeater] = useState("True");
  const [expiredDate, setExpiredDate] = useState(7);
  const [images, setImages] = useState([]);
  const [other, setOther] = useState("");

  //hook
  useEffect(() => {
    getRoomDetail({ id: location?.state?.id }, setPostDetail);
  }, []);

  useEffect(() => {
    console.log(postDetail);
    setDetailAddress(postDetail.detailAddress);
    setDescribeAddress(postDetail.describeAddress);
    setSquare(postDetail.square);
    setRoomType(postDetail.roomType);
    setNumberOfRoom(postDetail.numberOfRoom);
    setPrice(postDetail.price);
    if (postDetail.withOwner === true) setWithOwner("True");
    else {
      setWithOwner("False");
    }
    setImages(postDetail.images)
    setRoomType(postDetail.roomType);
    setKitchen(postDetail.kitchen);
    setElectric(postDetail.electricity_price);
    if (postDetail.balcony === true) setBalcony("True");
    else {
      setBalcony("False");
    }
    setWater(postDetail.water_price);
    if (postDetail.heater === true) setHeater("True");
    else {
      setHeater("False");
    }
    // setAirconditioner(postDetail.airconditioner);
    setOther(postDetail.other);
  }, [postDetail]);
  //function
  const handleOkModal=()=>{
    updatePost({
      detailAddress,
      describeAddress,
      roomType,
      numberOfRoom,
      price,
      square,
      withOwner,
      bathroomType,
      heater,
      kitchen,
      airconditioner,
      balcony,
      water_price:parseInt(water),
      electricity_price:parseInt(electric),
      other,
      // images,
      expiredDate
    },location?.state?.id)
    setVisible(false)
  }

  const handleOpenModal=()=>{
    setVisible(true)
  }

  const handleCancelModal=()=>{
    setVisible(false)
  }
  return (
    <div className="UpdatePost">
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ flex: 1.4 }} />
        <div style={{ flex: 14, display: "flex" }}>
          <div className="orange-text">{localStorage.getItem("Rooms_username")}</div>
          <div className="I" />
          <div className="black-text">Cập nhật bài đăng</div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.4 }} />
        <div style={{ flex: 14, marginTop: "15px" }}>
          Tạo bài đăng của chính bạn trên Easy Accomod!
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }} />
        <div style={{ flex: 0.2 }} />
        <div className="sidebar-div" style={{ flex: 7.8, padding: "30px" }}>
          <Form
            // ref={formRef}
            name="normal_signup"
            initialValues={{ remember: true }}
          >
            <div
              style={{ fontSize: "40px", textAlign: "center", color: "orange" }}
            >
              Cập nhật bài đăng
            </div>
            <Form.Item>
              <div className="text-password">Địa chỉ chi tiết </div>
              <Input
                style={{
                  borderRadius: "5px",
                }}
                value={detailAddress}
                placeholder={"Địa chỉ chi tiết"}
                onChange={(value) => {
                  setDetailAddress(value.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <div className="text-password">Mô tả địa chỉ</div>
              <TextArea
                rows={4}
                style={{
                  borderRadius: "5px",
                }}
                value={describeAddress}
                placeholder="Mô tả địa chỉ"
                onChange={(value) => {
                  setDescribeAddress(value.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <div className="square">Diện tích</div>
              <Input
                style={{
                  borderRadius: "5px",
                }}
                value={square}
                placeholder="Diện tích"
                onChange={(value) => {
                  setSquare(value.target.value);
                }}
              />
              <div
                style={{
                  position: "absolute",
                  color: "grey",
                  margin: "-30px 750px",
                }}
              >
                m2
              </div>
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex" }}>
                <div className="room-type" style={{ flex: 1 }}>
                  <div>Loại phòng</div>
                  <Select
                    value={roomType}
                    onChange={(value) => {
                      setRoomType(value);
                    }}
                  >
                    <Option value="phòng trọ">phòng trọ</Option>
                    <Option value="chung cư mini">chung cư mini</Option>
                    <Option value="nhà nguyên căn">nhà nguyên căn</Option>
                    <Option value="chung cư nguyên căn">
                      chung cư nguyên căn
                    </Option>
                  </Select>
                </div>
                <div style={{ flex: 0.5 }} />
                <div className="number-of-room" style={{ flex: 1 }}>
                  <div className="number-of-room">số lượng phòng </div>
                  <Select
                    value={numberOfRoom}
                    onChange={(value) => {
                      setNumberOfRoom(value);
                    }}
                  >
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>
                    <Option value={5}>5</Option>
                    <Option value={6}>6</Option>
                    <Option value={7}>7</Option>
                    <Option value={8}>8</Option>
                  </Select>
                </div>
                <div style={{ flex: 0.5 }} />
                <div className="price" style={{ flex: 1 }}>
                  <div className="price">giá cả</div>
                  <Select
                    value={price}
                    onChange={(value) => {
                      setPrice(value);
                    }}
                  >
                    <Option value={1000000}>1000000 đồng/tháng</Option>
                    <Option value={2000000}>2000000 đồng/tháng</Option>
                    <Option value={3000000}>3000000 đồng/tháng</Option>
                    <Option value={4000000}>4000000 đồng/tháng</Option>
                    <Option value={5000000}>5000000 đồng/tháng</Option>
                  </Select>
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <div style={{ display: "flex" }}>
                <div className="with-owner" style={{ flex: 1 }}>
                  <div>Có chung chủ</div>
                  <Select
                    value={withOwner}
                    onChange={(value) => {
                      setWithOwner(value);
                    }}
                  >
                    <Option value="True">Có</Option>
                    <Option value="False">Không</Option>
                  </Select>
                </div>
                <div style={{ flex: 0.5 }} />
                <div className="bathroom-type" style={{ flex: 1 }}>
                  <div className="bathroom-type">Loại phòng tắm</div>
                  <Select
                    value={bathroomType}
                    onChange={(value) => {
                      setBathRoomType(value);
                    }}
                  >
                    <Option value="khép kín">khép kín</Option>
                    <Option value="chung">chung</Option>
                  </Select>
                </div>
                <div style={{ flex: 0.5 }} />
                <div className="kitchen" style={{ flex: 1 }}>
                  <div className="kitchen">Nhà bếp</div>
                  <Select
                    value={kitchen}
                    onChange={(value) => {
                      setKitchen(value);
                    }}
                  >
                    <Option value="khu bếp riêng">khu bếp riêng</Option>
                    <Option value="khu bếp chung">khu bếp chung</Option>
                    <Option value="không nấu ăn">không nấu ăn</Option>
                  </Select>
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <div className="electric">Tiền điện </div>
                  <Input
                    style={{
                      borderRadius: "5px",
                    }}
                    value={electric}
                    placeholder="Tiền điện "
                    onChange={(value) => {
                      setElectric(value.target.value);
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      color: "grey",
                      margin: "-30px 140px",
                    }}
                  >
                    vnđ/số
                  </div>
                </div>
                <div style={{ flex: 0.5 }} />
                <div style={{ flex: 1 }}>
                  <div className="balcony">Ban công</div>
                  <Select
                    value={balcony}
                    onChange={(value) => {
                      setBalcony(value);
                    }}
                    style={{ width: 200 }}
                  >
                    <Option value="True">Có</Option>
                    <Option value="False">Không</Option>
                  </Select>
                </div>
                <div style={{ flex: 0.5 }} />
                <div style={{ flex: 1 }}>
                  <div className="electric">Tiền nước </div>
                  <Input
                    style={{
                      borderRadius: "5px",
                    }}
                    value={water}
                    placeholder="Tiền nước"
                    onChange={(value) => {
                      setWater(value.target.value);
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      color: "grey",
                      margin: "-30px 140px",
                    }}
                  >
                    vnđ/số
                  </div>
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <div style={{ display: "flex" }}>
                <div className="days" style={{ flex: 1 }}>
                  <div>Thời lượng đăng</div>
                  <Input
                    style={{
                      borderRadius: "5px",
                    }}
                    value={expiredDate}
                    placeholder="Thời lượng đăng"
                    onChange={(value) => {
                      setExpiredDate(value.target.value);
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      color: "grey",
                      margin: "-30px 270px",
                    }}
                  >
                    {" "}
                    ngày
                  </div>
                </div>
                <div style={{ flex: 0.5 }} />
                <div style={{ flex: 1 }}>
                  <div className="heater">Nóng lạnh</div>
                  <Select
                    value={heater}
                    onChange={(value) => {
                      setHeater(value);
                    }}
                  >
                    <Option value="True">Có</Option>
                    <Option value="False">Không</Option>
                  </Select>
                </div>
              </div>
            </Form.Item>

            <Form.Item>
              <div className="Mô tả khác">Mô tả khác</div>
              <TextArea
                rows={4}
                style={{
                  borderRadius: "5px",
                }}
                value={other}
                placeholder="Mô tả khác"
                onChange={(value) => {
                  setOther(value.target.value);
                }}
              />
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
                  onClick={() => handleOpenModal()}
                >
                  Tiếp theo
                </Button>
                <div style={{ flex: 5 }} />
              </div>
            </Form.Item>
          </Form>
        </div>
        <Modal
        visible={visible}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
      >
        <div>Bạn có chắc chắn muốn sửa bài không</div>
      </Modal>
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
  
  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost);
