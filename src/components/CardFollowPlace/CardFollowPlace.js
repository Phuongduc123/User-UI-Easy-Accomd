import React, { useRef, useState,useEffect } from "react";
import "./CardFollowPlace.css";
import { Card, Avatar, Pagination } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import PlaceCard from "../Card/PlaceCard";

const { Meta } = Card;
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function CardFollowPlace(props) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const handleChange = (value) => {
    props.setStart((value - 1) * 5);
    props.setEnd(value * 5);
  };
  

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(()=>{
  //   if(windowDimensions.width<800) props.setEnd(props.start+3)
  //   else{
  //     props.setEnd(props.start+5)
  //   }
  // },[windowDimensions])



  return (
    <div className="CardFollowPlace">
      <div style={{ display: "flex", marginTop: "30px" }}>
        <div className="line" />
        <div style={{ flexDirection: "column", flex: 1 }}>
          <div className="place">{`Địa điểm ${props.location}`}</div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 10 }} className="top-place">
              Top chỗ ở đánh giá tốt và đảm bảo nhất.
            </div>
            <div style={{ flex: 1,cursor:"pointer" }} className="watch-all">
              Xem thêm
            </div>
          </div>
        </div>  
      </div>
      <div style={{ display: "flex", justifyContent:"center", flexWrap:'wrap', marginTop: "1.3rem" }}>
        {props.posts.map((post, index) => {
          if (index === 0) {
            return (
              <div >
                <PlaceCard image={post.images[0]} id={post.id} post={post}/>
              </div>
            );
          } else {
            return (
              <>
                
                <div >
                  <PlaceCard image={post.images[0]} id={post.id} post={post}/>
                </div>
              </>
            );
          }
        })}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          defaultCurrent={1}
          defaultPageSize={5} // 5 default size of page
          onChange={handleChange} 
          total={100} //total number of card data available
        />
      </div>
    </div>
  );
}

export default CardFollowPlace;
