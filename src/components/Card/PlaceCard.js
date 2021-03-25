import React, { useEffect, useRef, useState } from "react";
import "./PlaceCard.css";
import { Card, Avatar, Input, Popover } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { postUpdateStatus,putExtendExpiredDate } from "../../request";
import { NotificationManager } from "react-notifications";

const { Meta } = Card;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function PlaceCard(props) {
  const [hiddenOption,setHiddenOption] = useState(false)
  const [updateRooms, setUpdateRooms] = useState("");
  const [extendExpried,setExtendExpried] = useState("")
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  //hook
  useEffect(() => {
    if(localStorage.getItem("Rooms_user_type")==="host"){
      setHiddenOption(false)
    }else{
      setHiddenOption(true)
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  //variable
  const contentOverEdit = (
    <div>
      <div>{`Cập nhật số phòng thuê (số phòng hiện tại là ${props.numberOfRoom}):`}</div>
      <Input
        value={updateRooms}
        onChange={(value) => {
          setUpdateRooms(value.target.value);
        }}
        onPressEnter={() => {
          if (parseInt(updateRooms) <= props.numberOfRoom) {
            postUpdateStatus(
              { numberOfRented: parseInt(updateRooms) },
              props.id
            );
          } else {
            NotificationManager.error(
              "",
              "sô phòng đã thuê phải nhỏ hơn số phòng sẵn có"
            );
          }
          setUpdateRooms("");
        }}
      />
    </div>
  );

  const contentOverExtendExpried = (
    <div>
      <div>{`Gia hạn bài đăng`}</div>
      <div>{`(chú ý mỗi ngày gia hạn thêm bạn phải trả 10.000 đồng):`}</div>
      <Input
        placeholder="Số ngày muốn gia hạn"
        value={extendExpried}
        onChange={(value) => {
          setExtendExpried(value.target.value);
        }}
        onPressEnter={() => {
            putExtendExpiredDate(
              { expiredDate: parseInt(extendExpried) },
              props.id
            );
        
          setExtendExpried("");
        }}
      />
    </div>
  );

  return (
    <Card
      style={{ width: 200,margin:"20px 10px", cursor: "pointer" }}
      loading={isLoading}
      hoverable={true}
      className="PlaceCard"
      bordered={false}
      cover={<img className="img-post" height="100px" alt="example" src={props.image} />}
      actions={[
         <SettingOutlined
          hidden={hiddenOption}
          key="setting"
          onClick={() => {
            history.push({
              pathname: "/update-room-detail",
              search: `?query=${props.id}`,
              state: {
                id: props.id,
                post: props.post,
              },
            });
          }}
        />,
        <Popover content={contentOverEdit}>
          <EditOutlined key="edit" hidden={hiddenOption}/>
        </Popover>,
        <Popover content={contentOverExtendExpried}>
          <EllipsisOutlined key="ellipsis" hidden={hiddenOption}/>
        </Popover>,
      ]}
    >
      <Meta
        onClick={() => {
          history.push({
            pathname: "/room-detail",
            search: `?query=${props.id}`,
            state: {
              id: props.id,
              post: props.post,
            },
          });
        }}
        style={{ fontFamily: "Montserrat", height: "1rem" }}
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={<div style={{fontSize:"15px",marginTop:"-5px"}}>{props.post?.detailAddress}</div> 
        }
        description={windowDimensions.width>=1100?<div>
          <div style={{fontSize:"10px", color:"red"}}>{`${props.post?.total_like} yêu thích`}</div>
          <div style={{fontSize:"10px", color:"black"}}>{`${props.post?.total_views} lượt xem`}</div>
        </div>:<></>}
      />
    </Card>
  );
}

export default PlaceCard;
