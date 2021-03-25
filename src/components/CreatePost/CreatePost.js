import React, { useEffect, useRef, useState } from "react";
import "./CreatePost.css";
import { Form, Input, Button, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import actions from "../../redux/actions/post/index";
import { connect } from "react-redux";
import SelectionProfile from "../SelectionProfile/SelectionProfile";
import Modal from "antd/lib/modal/Modal";
import {createNotification} from "../../utils/notification";
import {NotificationManager} from 'react-notifications';
const { TextArea } = Input;
const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function CreatePost(props) {
  const [step, setStep] = useState(1);
  const [detailAddress, setDetailAddress] = useState("");
  const [describeAddress, setDescribeAddress] = useState("");
  const [roomType, setRoomType] = useState("phòng trọ");
  const [rentTime, setRentime] = useState("tháng");
  const [numberOfRoom, setNumberOfRoom] = useState("");
  const [price, setPrice] = useState("");
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

  //function
  

  return (
    <div className="CreatePost">
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ flex: 1.4 }} />
        <div style={{ flex: 14, display: "flex" }}>
          <div className="orange-text">{localStorage.getItem("Rooms_username")} </div>
          <div className="I" />
          <div className="black-text">Tạo bài đăng</div>
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
          {step === 1 ? (
            <Step1
              detailAddress={detailAddress}
              describeAddress={describeAddress}
              roomType={roomType}
              rentTime={rentTime}
              numberOfRoom={numberOfRoom}
              price={price}
              square={square}
              withOwner={withOwner}
              bathroomType={bathroomType}
              kitchen={kitchen}
              airconditioner={airconditioner}
              balcony={balcony}
              electric={electric}
              water={water}
              heater={heater}
              expiredDate={expiredDate}
              setStep={setStep}
              setDetailAddress={setDetailAddress}
              setDescribeAddress={setDescribeAddress}
              setRoomType={setRoomType}
              setRentime={setRentime}
              setNumberOfRoom={setNumberOfRoom}
              setPrice={setPrice}
              setSquare={setSquare}
              setWithOwner={setWithOwner}
              setBathRoomType={setBathRoomType}
              setKitchen={setKitchen}
              setAirconditioner={setAirconditioner}
              setBalcony={setBalcony}
              setWater={setWater}
              setElectric={setElectric}
              setHeater={setHeater}
              setImages={setImages}
              setExpiredDate={setExpiredDate}
            />
          ) : (
            <Step2
              detailAddress={detailAddress}
              describeAddress={describeAddress}
              roomType={roomType}
              rentTime={rentTime}
              numberOfRoom={numberOfRoom}
              price={price}
              square={square}
              withOwner={withOwner}
              bathroomType={bathroomType}
              kitchen={kitchen}
              airconditioner={airconditioner}
              balcony={balcony}
              electric={electric}
              water={water}
              heater={heater}
              images={images}
              setImages={setImages}
              other={other}
              setOther={setOther}
              postPost={props.postPost}
              expiredDate={expiredDate}

            />
          )}
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
    postPost: (
      detailAddress,
      describeAddress,
      roomType,
      numberOfRoom,
      price,
      rent_time,
      square,
      withOwner,
      bathroomType,
      heater,
      kitchen,
      airconditioner,
      balcony,
      water_price,
      electricity_price,
      other,
      images,
      expiredDate
    ) => {
      dispatch(
        actions.postPost(
          detailAddress,
          describeAddress,
          roomType,
          numberOfRoom,
          price,
          rent_time,
          square,
          withOwner,
          bathroomType,
          heater,
          kitchen,
          airconditioner,
          balcony,
          water_price,
          electricity_price,
          other,
          images,
          expiredDate
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);

// Step 1
function Step1(props) {
  //hook

  //function

  const handleNext = () => {
    props.setStep(2);
  };
  return (
    <Form
      // ref={formRef}
      name="normal_signup"
      initialValues={{ remember: true }}
    >
      <div style={{ fontSize: "40px", textAlign: "center", color: "orange" }}>
        Bước 1: Mô tả cơ bản
      </div>
      <Form.Item>
        <div className="text-password">Địa chỉ chi tiết </div>
        <Input
          style={{
            borderRadius: "5px",
          }}
          value={props.detailAddress}
          placeholder={"Địa chỉ chi tiết"}
          onChange={(value) => {
            props.setDetailAddress(value.target.value);
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
          value={props.describeAddress}
          placeholder="Mô tả địa chỉ"
          onChange={(value) => {
            props.setDescribeAddress(value.target.value);
          }}
        />
      </Form.Item>
      <Form.Item>
        <div className="square">Diện tích(m2)</div>
        <Input
          style={{
            borderRadius: "5px",
          }}
          value={props.square}
          placeholder="Diện tích"
          onChange={(value) => {
            props.setSquare(value.target.value);
          }}
        />
        {/* <div
          style={{
            position: "absolute",
            color: "grey",
            margin: "-30px 750px",
          }}
        >
          m2
        </div> */}
      </Form.Item>
      <Form.Item>
        <div style={{ display: "flex" }}>
          <div className="room-type" style={{ flex: 1 }}>
            <div>Loại phòng</div>
            <Select
              
              value={props.roomType}
              onChange={(value) => {
                props.setRoomType(value);
              }}
            >
              <Option value="phòng trọ">phòng trọ</Option>
              <Option value="chung cư mini">chung cư mini</Option>
              <Option value="nhà nguyên căn">nhà nguyên căn</Option>
              <Option value="chung cư nguyên căn">chung cư nguyên căn</Option>
            </Select>
          </div>
          <div style={{ flex: 0.5 }} />
          <div className="number-of-room" style={{ flex: 1 }}>
            <div className="number-of-room">số lượng phòng </div>
            {/* <Select
              value={props.numberOfRoom}
              onChange={(value) => {
                props.setNumberOfRoom(value);
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
            </Select> */}
            <Input
              style={{
                borderRadius: "5px",
              }}
              value={props.numberOfRoom}
              placeholder="Số phòng "
              onChange={(value) => {
                props.setNumberOfRoom(value.target.value);
              }}
            />
          </div>
          <div style={{ flex: 0.5 }} />
          <div className="price" style={{ flex: 1 }}>
            <div className="price">giá cả</div>
            {/* <Select
              value={props.price}
              onChange={(value) => {
                props.setPrice(value);
              }}
            >
              <Option value={1000000}>1000000 đồng/tháng</Option>
              <Option value={2000000}>2000000 đồng/tháng</Option>
              <Option value={3000000}>3000000 đồng/tháng</Option>
              <Option value={4000000}>4000000 đồng/tháng</Option>
              <Option value={5000000}>5000000 đồng/tháng</Option>
            </Select> */}
            <Input
              style={{
                borderRadius: "5px",
              }}
              value={props.price}
              placeholder="Giá cả(vnđ/tháng) "
              onChange={(value) => {
                props.setPrice(value.target.value);
              }}
            />
          </div>
        </div>
      </Form.Item>

      <Form.Item>
        <div style={{ display: "flex" }}>
          <div className="with-owner" style={{ flex: 1 }}>
            <div>Có chung chủ</div>
            <Select
              value={props.withOwner}
              onChange={(value) => {
                props.setWithOwner(value);
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
              value={props.bathroomType}
              onChange={(value) => {
                props.setBathRoomType(value);
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
              value={props.kitchen}
              onChange={(value) => {
                props.setKitchen(value);
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
            <div className="electric">Tiền điện(vnđ/số) </div>
            <Input
              style={{
                borderRadius: "5px",
              }}
              value={props.electric}
              placeholder="Tiền điện "
              onChange={(value) => {
                props.setElectric(value.target.value);
              }}
            />
            {/* <div
              style={{
                position: "absolute",
                color: "grey",
                margin: "-30px 140px",
              }}
            >
              vnđ/số
            </div> */}
          </div>
          <div style={{ flex: 0.5 }} />
          <div style={{ flex: 1 }}>
            <div className="balcony">Ban công</div>
            <Select
              value={props.balcony}
              onChange={(value) => {
                props.setBalcony(value);
              }}
              style={{ width: 200 }}
            >
              <Option value="True">Có</Option>
              <Option value="False">Không</Option>
            </Select>
          </div>
          <div style={{ flex: 0.5 }} />
          <div style={{ flex: 1 }}>
            <div className="electric">Tiền nước(vnđ/số) </div>
            <Input
              style={{
                borderRadius: "5px",
              }}
              value={props.water}
              placeholder="Tiền nước"
              onChange={(value) => {
                props.setWater(value.target.value);
              }}
            />
            {/* <div
              style={{
                position: "absolute",
                color: "grey",
                margin: "-30px 140px",
              }}
            >
              vnđ/số
            </div> */}
          </div>
          
        </div>
      </Form.Item>

      <Form.Item>
        <div style={{ display: "flex" }}>
          <div className="days" style={{ flex: 1 }}>
            <div>Thời lượng đăng(ngày)</div>
            <Input
              style={{
                borderRadius: "5px",
              }}
              value={props.expiredDate}
              placeholder="Thời lượng đăng"
              onChange={(value) => {
                props.setExpiredDate(value.target.value);
              }}
            />
            {/* <div
              style={{
                position: "absolute",
                color: "grey",
                margin: "-30px 270px",
              }}
            >
              {" "}
              ngày
            </div> */}
          </div>
          <div style={{ flex: 0.5 }} />
          <div style={{ flex: 1 }}>
            <div className="heater">Nóng lạnh</div>
            <Select
              value={props.heater}
              onChange={(value) => {
                props.setHeater(value);
              }}
            >
              <Option value="True">Có</Option>
              <Option value="False">Không</Option>
            </Select>
          </div>
        </div>
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
              handleNext();
            }}
          >
            Tiếp theo
          </Button>
          <div style={{ flex: 5 }} />
        </div>
      </Form.Item>
    </Form>
  );
}

//step 2
function Step2(props) {
  const [visible, setVisible] = useState(false);
  const [fileList,setFileList] =useState([]);
  //hook

  //function
  const onChange = (info) => {
    setFileList(info.fileList)
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleOkModal = () => {
    props.postPost(
      props.detailAddress,
      props.describeAddress,
      props.roomType,
      parseInt(props.numberOfRoom),
      parseInt(props.price),
      props.rentTime,
      props.square,
      props.withOwner,
      props.bathroomType,
      props.heater,
      props.kitchen,
      props.airconditioner,
      props.balcony,
      props.water,
      props.electric,
      props.other,
      props.images,
      props.expiredDate
    );
    setVisible(false);
  };

  const handleCancelModal = () => {
    setVisible(false);
  };

  const handleOpenModal = () => {
    if(fileList.length>=5){
      setVisible(true);
      let tempImages=[]
      fileList.map((image)=>{
        tempImages.push(image.thumbUrl)
      })

      props.setImages(tempImages)
    }else{
      NotificationManager.error('Phải có tối thiểu 5 ảnh', 'Error');
    }
    
  };

  return (
    <div>
      <Form
        // ref={formRef}
        name="normal_signup"
        initialValues={{ remember: true }}
      >
        <div style={{ fontSize: "40px", textAlign: "center", color: "orange" }}>
          Bước 2: Ảnh và mô tả khác
        </div>
        <Form.Item>
          <div className="Mô tả khác">Thêm ảnh</div>
          <ImgCrop rotate>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 10 && "+ Upload"}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item>
          <div className="Mô tả khác">Mô tả khác</div>
          <TextArea
            rows={4}
            style={{
              borderRadius: "5px",
            }}
            value={props.other}
            placeholder="Mô tả khác"
            onChange={(value) => {
              props.setOther(value.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <div className="Mô tả khác">{`Số tiền bạn phải trả cho ${props.expiredDate} ngày thuê:`}</div>
          <div style={{fontSize:"20px"}}>{props.expiredDate*10} .000 đồng</div>
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
                handleOpenModal();
              }}
            >
              Tiếp theo
            </Button>
            <div style={{ flex: 5 }} />
          </div>
        </Form.Item>
      </Form>
      <Modal
        visible={visible}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
      >
        <div>Bạn có chắc chắn muốn đăng bài không</div>
      </Modal>
      
    </div>
  );
}
