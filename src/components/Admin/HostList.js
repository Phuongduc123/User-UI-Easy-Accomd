import { Button, Menu, Table } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Aside from './Aside';
import { useEffect, useState } from 'react';
import { getUnconfirmedHostList, putConfirmAccount,getNotificationList } from '../../request';

const { SubMenu } = Menu;

const columns = [
  {
    title:()=>(<div style={{fontSize:"16px",color:"#1890ff"}}>Id</div>),
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: ()=>(<div style={{fontSize:"16px",color:"#1890ff"}}>Tên tài khoản</div>),
    key: 'username',
    dataIndex: 'username'
  },
  {
    title: ()=>(<div style={{fontSize:"16px",color:"#1890ff"}}>Email</div>),
    key: "email",
    dataIndex: 'email'
  },
  {
    title: ()=>(<div style={{fontSize:"16px",color:"#1890ff"}}>Tên đầy đủ</div>),
    key: "fullname",
    dataIndex: 'fullname'
  },
  {
    title: ()=>(<div style={{fontSize:"16px",color:"#1890ff"}}>Chứng minh thư</div>),
    key:"identication",
    dataIndex: 'identication'
  },
  {
    title:()=>(<div style={{fontSize:"16px",color:"#1890ff"}}>Địa chỉ</div>),
    key:"address",
    dataIndex: "address"
  },
  {
    title: ()=>(<div style={{fontSize:"16px",color:"#1890ff"}}>Số điện thoại</div>),
    key:"phoneNumber",
    dataIndex: "phoneNumber" 
  },
  {
    title: ()=>(<div style={{fontSize:"16px",color:"#1890ff"}}>Xác nhận</div>),
    key: "confirm",
    render: (text,data)=>{
      return(
        <Button onClick={()=>{
          putConfirmAccount({is_confirmed:data.id})
        }}>Confirm</Button>
      )
    }
  }
  
];

//unconfirmedHostList
function HostList() {
  const [unonfirmedHostList,setUnonfirmedHostList] = useState([])
  const [start,setStart] = useState(0);
  const [end,setEnd] = useState(10);

  useEffect(()=>{
    getUnconfirmedHostList({start:start,end:end},setUnonfirmedHostList)
  },[])

  useEffect(()=>{
    getNotificationList()
  },[])

  return (
    <div className="HostList" style={{display:"flex"}}>
       <div style={{flex:1}}>
        <Aside selectedKeys={"1"} openKeys={"sub1"}/>
       </div> 
       <div style={{padding:"20px",flex:6}}>
       <Table columns={columns} dataSource={unonfirmedHostList} />
       </div>
        
      
    </div>
  );
}

export default HostList;
