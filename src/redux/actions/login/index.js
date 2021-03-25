/* eslint-disable import/no-anonymous-default-export */
import { CREATE_SOCKET, LOGOUT, POST_TO_LOGIN, POST_TO_LOGIN_SUCCESS, POST_USER_LIST } from "./action_type";

export default {
  postToLogin: (email,password,setLogged) => {
    return {
      type: POST_TO_LOGIN,
      params: {
        email,
        password,
      },
      setLogged
    };
  },
  postToLoginSuccess:()=>{
    return{
      type:POST_TO_LOGIN_SUCCESS
    }
  },
  logout:()=>{
    return{
      type:LOGOUT
    }
    
  },
  createSocket:() =>{
    return {
      type:CREATE_SOCKET,
      
    }
  },
  postUserList:(userList)=>{
    return{
      type:POST_USER_LIST,
      params:{
        userList
      }
    }
  }
  
  
};
