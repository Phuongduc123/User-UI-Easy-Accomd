import { Button, Menu, Popover, Table } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import {
    ConfirmedReview,
  getConfirmedReviewList,
  getUnconfirmedHostList,
  putAllowUpdate,
} from "../../request";
import { useHistory } from "react-router";

const { SubMenu } = Menu;

//unconfirmedHostList
function ReviewListConfirmed() {
  const [confirmedReviewList, setConfirmedReviewList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getConfirmedReviewList( setConfirmedReviewList);
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
        <div style={{ fontSize: "16px", color: "#1890ff" }}>Bài đăng</div>
      ),
      key: "post_id",
      dataIndex: "post_id",
    },
    {
      title: () => (
        <div style={{ fontSize: "16px", color: "#1890ff" }}>Bình luận</div>
      ),
      key: "comment",
      dataIndex: "comment",
    },
    {
        title: () => (
          <div style={{ fontSize: "16px", color: "#1890ff" }}>Đánh giá</div>
        ),
        key: "rating",
        dataIndex: "rating",
        render:(text)=>{
            return(
                <div>{`${text} sao`}</div>
            )
        }
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
                ConfirmedReview({id:data.id})
                getConfirmedReviewList( setConfirmedReviewList);
              }}
            >
              Xác nhận
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="ReviewListConfirmed" style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Aside selectedKeys={"5"} openKeys={"sub3"}/>
      </div>
      <div style={{ padding: "20px", flex: 6 }}>
        <Table columns={columns} dataSource={confirmedReviewList} />
      </div>
    </div>
  );
}

export default ReviewListConfirmed;
