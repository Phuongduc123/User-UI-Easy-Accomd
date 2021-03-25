import React, { useRef, useState } from "react";
import "./SideMenu.css";
import { Form, Input, Button, Checkbox, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom"
const { Search } = Input;
const { TextArea } = Input;

function SideMenu(props) {
  return (
        <div>
          {props.type==='account'?
          <ul className="list-sidebar">
            <li className="elm">
              <Link to="/profile">Thông tin tài khoản</Link>
            </li>
            <li className="elm">
              <Link to="/change-password">Thay đổi mật khẩu</Link>
            </li>
            <li className="elm">
              <Link to="/delete-account">Quản lý tài khoản</Link>
            </li>
          </ul>:
          //host
          <ul className="list-sidebar">
            <li className="elm">
              <Link to="/manage-post">Đang được đăng</Link>
            </li>
            <li className="elm">
              <Link to="/manage-post-being-approved">Đang được duyệt</Link>
            </li>
            <li className="elm">
              <Link to="/manage-post-expired">Đã hết hạn</Link>
            </li>
          </ul>}
        </div>
  );
}

export default SideMenu;
