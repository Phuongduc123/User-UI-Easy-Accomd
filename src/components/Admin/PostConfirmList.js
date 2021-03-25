import { Button, Menu, Popover, Table } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import {
  getConfirmedHostList,
  getConfirmedPostList,
  getUnconfirmedHostList,
  putAllowUpdate,
} from "../../request";
import { useHistory } from "react-router";

const { SubMenu } = Menu;

//unconfirmedHostList
function PostConfirmList() {
  const [confirmedPostList, setConfirmedPostList] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const history = useHistory();

  useEffect(() => {
    getConfirmedPostList({ start: start, end: end }, setConfirmedPostList);
  }, []);

  //variable
  const columns = [
    {
      title: () => <div style={{ fontSize: "16px", color: "#1890ff" }}>Id</div>,
      key: "id",
      dataIndex: "id",
    },
    {
      title: () => (
        <div style={{ fontSize: "16px", color: "#1890ff" }}>Địa chỉ</div>
      ),
      key: "detailAddress",
      dataIndex: "detailAddress",
    },
    {
      title: () => (
        <div style={{ fontSize: "16px", color: "#1890ff" }}>Người đăng</div>
      ),
      key: "hostName",
      dataIndex: "hostName",
    },
    {
      title: () => (
        <div style={{ fontSize: "16px", color: "#1890ff" }}>Xác nhận</div>
      ),
      key: "confirm",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                history.push({
                  pathname: "/room-detail",
                  search: `?query=${data.id}`,
                  state: {
                    id: data.id,
                  },
                });
              }}
            >
              Chi tiết
            </Button>
            <Button
              onClick={() => {
                history.push({
                  pathname: "/admin/statistic",
                  search: `?query=${data.id}`,
                  state: {
                    id: data.id,
                  },
                });
              }}
            >
              Thống kê
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="PostConfirmList" style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Aside selectedKeys={"3"} openKeys={"sub2"}/>
      </div>
      <div style={{ padding: "20px", flex: 6 }}>
        <Table columns={columns} dataSource={confirmedPostList} />
      </div>
    </div>
  );
}

export default PostConfirmList;
