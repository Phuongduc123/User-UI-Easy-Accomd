import React, { useEffect, useRef, useState } from "react";
import "./Favorite.css";
import { Form, Input, Button, Checkbox, Radio, Pagination } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SideMenu from "../SideMenu/SideMenu.js";
import actions from "../../redux/actions/profile/index";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFavorite } from "../../request";
import PlaceCard from "../Card/PlaceCard";
const { TextArea } = Input;

function Favorite(props) {
  const formRef = useRef();
  const [postFavorite, setPostFavorite] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(8);

  //hook
  useEffect(() => {
    getFavorite({ start: start, end: end }, setPostFavorite);
  }, []);

  useEffect(() => {
    getFavorite({ start: start, end: end }, setPostFavorite);
  }, [start, end]);

  //function
  const renderPostListIsntConfirmed = () => {
    let numberOfRowItem = Math.ceil(postFavorite.length / 4) + 1; //number of rows
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
          {postFavorite.map((post, index) => {
            if (index - i * 4 < 4 && index - i * 4 >= 0) {
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

  const handleChange = (value) => {
    setStart((value - 1) * 8);
    setEnd(value * 8);
  };

  return (
    <div className="Favorite">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }} />
        <ul className="list-profile" style={{ flex: 14 }}>
          <li className="option" style={{ opacity: "0.5" }}>
            <Link to="/profile">Tài khoản</Link>
          </li>
          <li className="option">
            <Link to="/favorite">Yêu thích</Link>
          </li>
          <li className="option" style={{ opacity: "0.5" }}>
            <Link to="/notifacation">Thông báo</Link>
          </li>
        </ul>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.4 }} />
        <div style={{ flex: 14, display: "flex" }}>
          <div className="orange-text">{localStorage.getItem("Rooms_username")}</div>
          <div className="I" />
          <div className="black-text">Danh sách phòng yêu thích</div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.4 }} />
        <div style={{ flex: 14, marginTop: "15px" }}>
        Nhanh chân đặt ngay trước khi hết phòng nhé!
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }} />

        <div style={{ flex: 0.2 }} />
        <div className="sidebar-div" style={{ flex: 7.8, padding: "30px" }}>
          <Form
            ref={formRef}
            name="normal_signup"
            initialValues={{ remember: true }}
          >
            {renderPostListIsntConfirmed()}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                defaultCurrent={1}
                defaultPageSize={8} // 5 default size of page
                onChange={handleChange}
                total={100} //total number of card data available
              />
            </div>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRenterProfile: (setProfile) => {
      dispatch(actions.getRenterProfile(setProfile));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
