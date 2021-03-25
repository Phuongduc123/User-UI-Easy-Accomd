/* eslint-disable import/no-anonymous-default-export */
import {  CREATE_SOCKET, LOGOUT, POST_TO_LOGIN, POST_TO_LOGIN_SUCCESS, POST_USER_LIST} from "../actions/login/action_type";
import {postToLogin} from "../../request";

export default (
  state = {
    logged:false,
    websocket:"",
    userList:[]
  },
  action
) => {
  switch (action.type) {
    case POST_USER_LIST:{
      console.log(action.userList)
      return {
        ...state,
        userList:action.params.userList
      }
    }
    case POST_TO_LOGIN_SUCCESS:{
      console.log("success")
      return {
        ...state,
        logged:!state.logged
      }
      
    }

    case LOGOUT:{
      return {
        ...state,
        logged:!state.logged
      }
      
    }

    case CREATE_SOCKET:{
      return {
        ...state,
        websocket:`http://127.0.0.1:8000/messages/${localStorage.getItem("Rooms_username")}/thao`
      }
    }
    
    default: {
      return { ...state };
    }
  }
};
