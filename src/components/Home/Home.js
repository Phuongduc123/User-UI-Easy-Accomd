import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { Form, Input, Button, Carousel, Affix, Pagination } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import CardFollowPlace from "../CardFollowPlace/CardFollowPlace";
import actions from "../../redux/actions/post/index";
import { connect } from "react-redux";
import { getNotificationList, getPostHomepage, getSearchPost } from "../../request";
import PlaceCard from "../Card/PlaceCard";
const { Search } = Input;

const contentStyle = {
  height: "260px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function onChange(a, b, c) {
  
}

function Home(props) {
  //state
  const [postHaNoi, setPostHaNoi] = useState([]);
  const [postHCM, setPostHCM] = useState([]);
  const [postDaNang, setPostDaNang] = useState([]);
  const [startHaNoi, setStartHaNoi] = useState(0);
  const [endHaNoi, setEndHaNoi] = useState(5);
  const [startHCM, setStartHCM] = useState(0);
  const [endHCM, setEndHCM] = useState(5);
  const [startDaNang, setStartDaNang] = useState(0);
  const [endDaNang, setEndDaNang] = useState(5);
  const [searchPost, setSearchPost] = useState([]);
  const [startSearchPost, setStartSearchPost] = useState(0);
  const [endSearchPost, setEndSearchPost] = useState(5);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  //hook
  useEffect(()=>{
    if(localStorage.getItem("Rooms_user_type")==="host"){
      getNotificationList()
    }
  },[])

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getSearchPost(
      {
        searching: props.searching,
        start: startSearchPost,
        end: endSearchPost,
      },
      setSearchPost
    );
  }, [props.searching, startSearchPost, endSearchPost]);

  // HaNoi
  useEffect(() => {
    getPostHomepage(
      { location: "Hà Nội", start: startHaNoi, end: endHaNoi },
      setPostHaNoi
    );
  }, [startHaNoi, endHaNoi]);
  // HCM
  useEffect(() => {
    getPostHomepage(
      { location: "Hồ Chí Minh", start: startHCM, end: endHCM },
      setPostHCM
    );
  }, [startHCM, endHCM]);
  //Da Nang
  useEffect(() => {
    getPostHomepage(
      { location: "Đà Nẵng", start: startDaNang, end: endDaNang },
      setPostDaNang
    );
  }, [startDaNang, endDaNang]);

  //function
  const renderSearchPostList = () => {
    let numberOfRowItem = Math.ceil(searchPost.length / 5) + 1; //number of rows
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
          {searchPost.map((post, index) => {
            if (index - i * 5 < 5 && index - i * 5 >= 0) {
              return (
                <div key={index} style={{ margin: "10px" }}>
                  <PlaceCard
                    image={post.images[0]}
                    hostName={post.hostName}
                    id={post.id}
                    post={post}
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
    <div className="Home">
      <div
        style={{  marginTop: "10px", paddingLeft: "5rem", paddingRight: "5rem" }}
      >
        <Carousel autoplay={true} afterChange={onChange}>
          {localStorage.getItem("Rooms_user_type")!==""?
          <div>
            <img src="./assets/DaNangImage.png" width={windowDimensions.width*0.9} height={windowDimensions.width/3.5} />
          </div>:
          <div>
          <img src="./assets/image1.png" width={windowDimensions.width*0.9} height={windowDimensions.width/3.5} />
          </div>
          }
          {localStorage.getItem("Rooms_user_type")!==""?<div>
            <img src="./assets/HaNoiImage.png" width={windowDimensions.width*0.9} height={windowDimensions.width/3.5} />
          </div>:
          <div>
          <img src="./assets/image2.png" width={windowDimensions.width*0.9} height={windowDimensions.width/3.5} />
          </div>}
          {localStorage.getItem("Rooms_user_type")!==""?<div>
            <img src="./assets/SaiGonImage.png" width={windowDimensions.width*0.9} height={windowDimensions.width/3.5} />
          </div>:
          <div>
          <img src="./assets/image3.png" width={windowDimensions.width*0.9} height={windowDimensions.width/3.5} />
          </div>}
          
        </Carousel>
        
        
        <div>
          {props.searching !== "" ? (
            <div className="sidebar-div" style={{ flex: 7.8, padding: "30px" }}>
              <Form name="normal_signup" initialValues={{ remember: true }}>
                <div
                  style={{ fontSize: "20px" }}
                >{`Kết quả tìm kiếm cho từ khóa: ${props.searching}`}</div>
                {renderSearchPostList()}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    defaultCurrent={1}
                    defaultPageSize={5} // 5 default size of page
                    onChange={(value) => {
                      setStartSearchPost((value - 1) * 5);
                      setEndSearchPost(value * 5);
                    }}
                    total={100} //total number of card data available
                  />
                </div>
              </Form>
            </div>
          ) : (
            <></>
          )}
          <CardFollowPlace
            posts={postHaNoi}
            start={startHaNoi}
            setStart={setStartHaNoi}
            location={"Hà Nội"}
            setEnd={setEndHaNoi}
          />
          <CardFollowPlace
            posts={postHCM}
            start={startHCM}
            setStart={setStartHCM}
            location={"Hồ Chí Minh"}
            setEnd={setEndHCM}
          />
          <CardFollowPlace
          start={startDaNang}
            posts={postDaNang}
            setStart={setStartDaNang}
            location={"Đà Nẵng"}
            setEnd={setEndDaNang}
          />
        </div>
      </div>

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

const mapStateToProps = (state) => {
  return {
    searching: state.post.searching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
