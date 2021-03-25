import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const { SubMenu } = Menu;


function Aside(props) {
  //state
  const [selectedKeys,setSelectedKeys]= useState("0")

    const handleClick = e => {
        setSelectedKeys(e.key)
        console.log('click ', e);
    };
  return (
    <div className="Aside">
      <Menu
        onClick={handleClick}
        style={{ width: 256,marginTop:"3px" }}
        defaultSelectedKeys={[props.selectedKeys]}
        defaultOpenKeys={[props.openKeys]}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Chủ trọ">
            <Menu.Item key="1"><Link to="/admin/list-host">Chủ trọ chưa xác nhận</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/admin/list-host-confirmed">Chủ trọ xác nhận</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Bài đăng">
          <Menu.Item key="3"><Link to="/admin/list-post-confirmed">Bài đăng xác nhận</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/admin/list-post-unconfirmed">Bài đăng chưa xác nhận</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Đánh giá">
          <Menu.Item key="5"><Link to="/admin/list-review-confirmed">Đánh giá chưa xác nhận</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="6"><Link to="/admin/statistic">Thống kê</Link></Menu.Item>
      </Menu>

      
    </div>
  );
}

export default Aside;
