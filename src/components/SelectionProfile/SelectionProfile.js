import React, { useEffect, useRef, useState } from "react";
import "./SelectionProfile.css";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Profile(props) {
  const path = useLocation();  

  useEffect(()=>{
      console.log(path)
  })

  return (
    <div className="SelectionProfile">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }} />
        <ul className="list-profile" style={{ flex: 14}}>
          <li className="option" style={{opacity:path.pathname==="/host-profile"?"":"0.5"}}>
            <Link to="/host-profile">Tài khoản</Link>
          </li>
          <li className="option" style={{opacity:path.pathname==="/manage-post"?"":"0.5"}}>
            <Link to="/manage-post">Quản lý bài viết</Link>
          </li>
          <li className="option" style={{opacity:path.pathname==="/notification"?"":"0.5"}}>
            <Link to="/notification">Thông báo</Link>
          </li>
        </ul>
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
    
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
