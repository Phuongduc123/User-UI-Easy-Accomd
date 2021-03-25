import React, { useEffect, useRef, useState } from "react";
import "./ManagePost.css";
import { Form, Input, Button, Checkbox, Radio, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SideMenu from "../SideMenu/SideMenu.js";
import actions from "../../redux/actions/post/index";
import { connect } from "react-redux";
import SelectionProfile from "../SelectionProfile/SelectionProfile";
import CardFollowPlace from "../CardFollowPlace/CardFollowPlace";
import PlaceCard from "../Card/PlaceCard";
const { TextArea } = Input;

function ManagePost(props) {
  const formRef = useRef();

  //hook
  useEffect(() => {
    props.getHostPostList();
  }, []);

  //function
  const renderPostListIsntConfirmed = () => {
    let numberOfRowItem = Math.ceil(props.postListIsntConfirmed.length / 3) + 1; //number of rows
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
          {props.postListIsConfirmed.map((post, index) => {
            if (index - i * 3 < 3 && index - i * 3 >= 0) {
              return (
                <div key={index} style={{ margin: "10px" }}>
                  <PlaceCard image={post.images[0]} hostName={post.hostName} id={post.id} post={post} numberOfRoom={post.numberOfRoom} />
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
    <div className="Profile">
      <SelectionProfile />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.4 }} />
        <div style={{ flex: 14, display: "flex" }}>
          <div className="orange-text">{localStorage.getItem("Rooms_username")}</div>
          <div className="I" />
          <div className="black-text">Quản lý bài viết</div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.4 }} />
        <div style={{ flex: 14, marginTop: "15px", wordBreak: "break-all" }}>
          Nếu bạn muốn thêm thời gian bài viết được hiển thị, hãy gia hạn với
          chúng tôi
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }} />
        <div className="sidebar-div" style={{ flex: 2.2, height: "70%" }}>
          <SideMenu type={"manage post"} />
        </div>

        <div style={{ flex: 0.2 }} />
        <div className="sidebar-div" style={{ flex: 7.8, padding: "30px" }}>
          <Form
            ref={formRef}
            name="normal_signup"
            initialValues={{ remember: true }}
          >
            {renderPostListIsntConfirmed()}
          </Form>
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
  return {
    postListIsntConfirmed: state.post.postListIsntConfirmed,
    postListIsConfirmed: state.post.postListIsConfirmed
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHostPostList: () => {
      dispatch(actions.getHostPostList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePost);
