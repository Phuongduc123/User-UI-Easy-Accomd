/* eslint-disable import/no-anonymous-default-export */
import { POST_INFORM_TO_SIGNUP,POST_INFORM_TENANT_TO_SIGNUP } from "./action_type";

export default {
  postInformToSignup: (email, username, password,setSuccessSignup,setNotification) => {
    return {
      type: POST_INFORM_TO_SIGNUP,
      params: {
        email,
        username,
        password,
      },
      setSuccessSignup,
      setNotification
    };
  },
  postInformTenantToSignup: (email,username,password,fullname,identication,address,phoneNumber,setSuccessSignup,setNotification)=>{
    console.log("111")
    return{
      type:POST_INFORM_TENANT_TO_SIGNUP,
      params:{
        email,
        username,
        password,
        fullname,
        identication,
        address,
        phoneNumber
      },
      setSuccessSignup,
      setNotification
    }
  }
};
