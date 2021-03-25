import { Affix } from "antd";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import CreatePost from "./components/CreatePost/CreatePost";
import Favorite from "./components/Favorite/Favorite";
import Home from "./components/Home/Home";
import HostProfile from "./components/HostProfile/HostProfile";
import Login from "./components/Login/Login";
import ManageAccount from "./components/ManageAccount/ManageAccount";
import ManagePost from "./components/ManagePost/ManagePost";
import Profile from "./components/Profile/Profile";
import ProfileChangePassword from "./components/ProfileChangePassword/ProfileChangePassword";
import RentSignup from "./components/RentSignup/RentSignup";
import RoomDetail from "./components/RoomDetail/RoomDetail";
import Signup from "./components/Signup/Signup";
import TypePeople from "./components/TypePeople/TypePeople";
import RoomFilter from "./components/RoomFilter/RoomFilter";
import HostList from "./components/Admin/HostList";
import HostListConfirmed from "./components/Admin/HostListConfirmed";
import UpdatePost from "./components/UpdatePost/UpdatePost";
import PostConfirmList from "./components/Admin/PostConfirmList";
import PostUnconfirmList from "./components/Admin/PostUnconfirmedList";
import ManagePostHaventConfirmed from "./components/ManagePostHaventConfirmed/ManagePostHaventConfirmed";
import ReviewListConfirmed from "./components/Admin/ReviewListConfirmed";
import Statistic from "./components/Admin/Statistic";
function Routers() {
  const [logged,setLogged]= useState("false")
  useEffect(()=>{
    setLogged(localStorage.getItem("Rooms_logged"))
  },[])
  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/select-people-type">
          <TypePeople />
        </Route>
        <Route path="/tenant-signup">
          <RentSignup />
        </Route>
        <Route path="/change-password">
          <ProfileChangePassword />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/delete-account">
          <ManageAccount />
        </Route>
        <Route path="/host-profile">
          <HostProfile/>
        </Route>
        <Route path="/manage-post">
          <ManagePost/>
        </Route>
        <Route path="/manage-post-being-approved">
          <ManagePostHaventConfirmed/>
        </Route>
        <Route path="/room-detail">
          <RoomDetail/>
        </Route>
        <Route path="/create-post">
          <CreatePost/>
        </Route>
        <Route path="/favorite">
          <Favorite/>
        </Route>
        <Route path="/search">
          <RoomFilter/>
        </Route>
        <Route path="/update-room-detail">
          <UpdatePost/>
        </Route>
        


        {/* Admin */}
        <Route path="/admin/list-host">
          <HostList/>
        </Route>
        <Route path="/admin/list-host-confirmed">
          <HostListConfirmed/>  
        </Route>
        <Route path="/admin/list-post-confirmed">
          <PostConfirmList/>  
        </Route>
        <Route path="/admin/list-post-unconfirmed">
          <PostUnconfirmList/>  
        </Route>
        <Route path="/admin/list-review-confirmed">
          <ReviewListConfirmed/>
        </Route>
        <Route path="/admin/statistic">
          <Statistic/>
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

        
      </Switch>
      
    </div>
  );
}

export default Routers;
