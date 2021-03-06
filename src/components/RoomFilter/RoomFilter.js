import React, { useEffect, useRef, useState } from "react";
import "./RoomFilter.css";
import { Form, Input, Button, Carousel, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import CardFollowPlace from "../CardFollowPlace/CardFollowPlace";
import PlaceCard from "../Card/PlaceCard";
import { getPostFilter } from "../../request";
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;

function RoomFilter() {
  //state
  const [detailAddress, setDetailAddress] = useState("");
  const [describeAddress, setDescribeAddress] = useState("");
  const [roomType, setRoomType] = useState("");
  const [numberOfRoom, setNumberOfRoom] = useState("");
  const [price, setPrice] = useState("");
  const [square, setSquare] = useState("");
  const [withOwner, setWithOwner] = useState("");
  const [bathroomType, setBathRoomType] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [airconditioner, setAirconditioner] = useState("");
  const [heater, setHeater] = useState("");
  const [postList, setPostList] = useState([]);
  const [hiddenPostList,setHiddenPostList] = useState(false)

  //hook
  useEffect(() => {
    console.log(postList);
  }, [postList]);

  //function
  const renderPostList = () => {
    let numberOfRowItem = Math.ceil(postList.length / 4) + 1; //number of rows
    let contentRows = []; // content of 1 row
    for (let i = 0; i < numberOfRowItem; i++) {
      contentRows.push(
        <div
          style={{
            display: "flex",
            whiteSpace: "break-spaces",
            justifyContent: "center",
          }}
        >
          {postList.map((post, index) => {
            if (index - i * 4 < 4 && index - i * 4 >= 0) {
              return (
                <div key={index} style={{ margin: "10px" }}>
                  <PlaceCard
                    image={post.images[0]}
                    hostName={post.hostName}
                    id={post.id}
                    post={post}
                    numberOfRoom={post.numberOfRoom}
                  />
                </div>
              );
            }
          })}
        </div>
      );
    }

    return contentRows.map((contentRow) => {
      return contentRow;
    });
  };

  return (
    <div className="RoomFilter">
      <div
        style={{ marginTop: "10px", paddingLeft: "5rem", paddingRight: "5rem" }}
      >
        <div style={{ display: "flex", marginTop: "30px" }}>
          <div className="line" />
          <div style={{ flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex" }}>
              <div className="place">L???a ch???n khu v???c b???n c???n t??m</div>
              <Select
                className="select-province"
                defaultValue="H?? N???i"
                style={{ width: 120, marginLeft: "20px" }}
              >
                <Option value="S??i G??n">S??i G??n</Option>
                <Option value="H?? N???i">H?? N???i</Option>
              </Select>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ flex: 10 }} className="top-place">
                T???ng s??? n??i b???n c?? th??? xem:{" "}
                <span style={{ fontSize: "30px" }}>50</span>
              </div>
              <div style={{ flex: 1 }} className="watch-all">
                Xem th??m
              </div>
            </div>

            {/* filter */}
            <div>
              <div className="add-filter">Th??m b??? l???c</div>
              <div className="all-filter">
                <div style={{ fontSize: "20px" }}>?????a ??i???m</div>
                <div
                  className="location-filter"
                  style={{ display: "flex", color: "rgba(0, 0, 0, 0.45)" }}
                >
                  <Input
                    detailAddress={detailAddress}
                    onChange={(value) => {
                      setDetailAddress(value.target.value);
                    }}
                    placeholder="?????a ??i???m"
                  />
                </div>

                <div className="detail address" style={{ marginTop: "10px" }}>
                  <div className="text-password">M?? t??? ?????a ch???</div>
                  <TextArea
                    describeAddress={describeAddress}
                    onChange={(value) => {
                      setDescribeAddress(value.target.value);
                    }}
                    rows={4}
                    style={{
                      borderRadius: "5px",
                    }}
                    // value={props.describeAddress}
                    placeholder="M?? t??? ?????a ch???"
                  />
                </div>

                <div className="detail address" style={{ marginTop: "10px" }}>
                  <div className="square">Di???n t??ch</div>
                  <Input
                    style={{
                      borderRadius: "5px",
                    }}
                    value={square}
                    placeholder="Di???n t??ch (m2)"
                    onChange={(value) => {
                      setSquare(value.target.value);
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex" }}>
                    <div className="room-type" style={{ flex: 1 }}>
                      <div>Lo???i ph??ng</div>
                      <Select
                        value={roomType}
                        onChange={(value) => {
                          setRoomType(value);
                        }}
                      >
                        <Option value="ph??ng tr???">ph??ng tr???</Option>
                        <Option value="chung c?? mini">chung c?? mini</Option>
                        <Option value="nh?? nguy??n c??n">nh?? nguy??n c??n</Option>
                        <Option value="chung c?? nguy??n c??n">
                          chung c?? nguy??n c??n
                        </Option>
                        <Option value="">M???c ?????nh</Option>
                      </Select>
                    </div>
                    <div style={{ flex: 0.5 }} />
                    <div className="number-of-room" style={{ flex: 1 }}>
                      <div className="heater">N??ng l???nh</div>
                      <Select
                        value={heater}
                        onChange={(value) => {
                          setHeater(value);
                        }}
                      >
                        <Option value="True">C??</Option>
                        <Option value="False">Kh??ng</Option>
                        <Option value="">M???c ?????nh</Option>
                      </Select>
                    </div>
                    <div style={{ flex: 0.5 }} />
                    <div className="price" style={{ flex: 1 }}>
                      <div className="price">gi?? c???</div>
                      <Select
                        value={price}
                        onChange={(value) => {
                          setPrice(value);
                        }}
                      >
                        <Option value={1000000}>1000000 ?????ng/th??ng</Option>
                        <Option value={2000000}>2000000 ?????ng/th??ng</Option>
                        <Option value={3000000}>3000000 ?????ng/th??ng</Option>
                        <Option value={4000000}>4000000 ?????ng/th??ng</Option>
                        <Option value={5000000}>5000000 ?????ng/th??ng</Option>
                        <Option value="">M???c ?????nh</Option>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex" }}>
                    <div className="with-owner" style={{ flex: 1 }}>
                      <div>C?? chung ch???</div>
                      <Select
                        value={withOwner}
                        onChange={(value) => {
                          setWithOwner(value);
                        }}
                      >
                        <Option value="True">C??</Option>
                        <Option value="False">Kh??ng</Option>
                        <Option value="">M???c ?????nh</Option>
                      </Select>
                    </div>
                    <div style={{ flex: 0.5 }} />
                    <div className="bathroom-type" style={{ flex: 1 }}>
                      <div className="bathroom-type">Lo???i ph??ng t???m</div>
                      <Select
                        value={roomType}
                        onChange={(value) => {
                          setRoomType(value);
                        }}
                      >
                        <Option value="kh??p k??n">kh??p k??n</Option>
                        <Option value="chung">chung</Option>
                        <Option value="">M???c ?????nh</Option>
                      </Select>
                    </div>
                    <div style={{ flex: 0.5 }} />
                    <div className="kitchen" style={{ flex: 1 }}>
                      <div className="kitchen">Nh?? b???p</div>
                      <Select
                        value={kitchen}
                        onChange={(value) => {
                          setKitchen(value);
                        }}
                      >
                        <Option value="khu b???p ri??ng">khu b???p ri??ng</Option>
                        <Option value="khu b???p chung">khu b???p chung</Option>
                        <Option value="kh??ng n???u ??n">kh??ng n???u ??n</Option>
                        <Option value="">M???c ?????nh</Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 4 }} />
                  <div
                    className="search-in-filter"
                    style={{ flex: 1, cursor: "pointer" }}
                    onClick={() => {
                      setHiddenPostList(true)
                      getPostFilter(
                        {
                          detailAddress: detailAddress,
                          describeAddress: describeAddress,
                          roomType: roomType,
                          square: square,
                          heater: heater,
                          price: price,
                          bathroomType: bathroomType,
                          kitchen: kitchen,
                        },
                        setPostList
                      );
                    }}
                  >
                    T??m ki???m
                  </div>
                  <div style={{ flex: 4 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hiddenPostList===true?<div style={{ display: "flex" }}>
        <div style={{flex:"1"}}/>
        <div className="sidebar-div" style={{ flex: 7.8, padding: "30px" }}>
          <Form name="normal_signup" initialValues={{ remember: true }}>
            {renderPostList()}
          </Form>
        </div>
        <div style={{flex:"1"}}/>
      </div>:<></>}

      {/* footer */}
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

export default RoomFilter;

function RowPlaceCard() {
  return (
    <div
      style={{
        display: "flex",
        paddingLeft: "7rem",
        paddingRight: "5rem",
        marginTop: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <PlaceCard />
      </div>
      <div style={{ flex: 0.2 }} />
      <div style={{ flex: 1 }}>
        <PlaceCard />
      </div>
      <div style={{ flex: 0.2 }} />
      <div style={{ flex: 1 }}>
        <PlaceCard />
      </div>
      <div style={{ flex: 0.2 }} />
      <div style={{ flex: 1 }}>
        <PlaceCard />
      </div>
      <div style={{ flex: 0.2 }} />
      <div style={{ flex: 1 }}>
        <PlaceCard />
      </div>
    </div>
  );
}
