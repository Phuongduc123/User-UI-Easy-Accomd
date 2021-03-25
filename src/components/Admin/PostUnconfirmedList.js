import { Button, Menu, Pagination, Popover, Table } from "antd";
import {
} from "@ant-design/icons";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import {
  getUnConfirmedPostList, putAllowUpdate, putAllowUpdatePost
} from "../../request";
import { useHistory } from "react-router";

const { SubMenu } = Menu;

//unconfirmedHostList
function PostUnconfirmList() {
  const [UnconfirmedPostList, setUnconfirmedPostList] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const history = useHistory();

  useEffect(() => {
    getUnConfirmedPostList({ start: start, end: end }, setUnconfirmedPostList);
  }, []);

  useEffect(() => {
    getUnConfirmedPostList({ start: start, end: end }, setUnconfirmedPostList);
  }, [start,end]);

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
                putAllowUpdatePost({id:data.id});
                getUnConfirmedPostList({ start: start, end: end }, setUnconfirmedPostList);
              }}
            >
              Phê duyệt
            </Button>
          </div>
        );
      },
    },
  ];

  //function
  const handleChange = (value) => {
    setStart((value - 1) * 10);
    setEnd(value * 10);
  };

  return (
    <div className="PostUnconfirmList" style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Aside selectedKeys={"4"} openKeys={"sub2"}/>
      </div>
      <div style={{ padding: "20px", flex: 6 }}>
        <Table columns={columns} dataSource={UnconfirmedPostList} pagination={false}/>
        <div style={{display:"flex",justifyContent:"center"}}>
            <Pagination
            defaultCurrent={1}
            defaultPageSize={10} // 5 default size of page
            onChange={handleChange} 
            total={100} //total number of card data available
            />
        </div>
        
      </div>
    </div>
  );
}

export default PostUnconfirmList;
