/* eslint-disable import/no-anonymous-default-export */
import { POST_INFORM_TO_SIGNUP,POST_INFORM_TENANT_TO_SIGNUP } from "../actions/signup/action_type";
import {postInformTenantToSignup, postInformToSignup} from "../../request";

export default (
  state = {
  },
  action
) => {
  switch (action.type) {
    
    case POST_INFORM_TO_SIGNUP:{
      postInformToSignup(action.params,action.setSuccessSignup,action.setNotification)
      return {
        ...state,  
      }
      
    }

    case POST_INFORM_TENANT_TO_SIGNUP:{
      postInformTenantToSignup(action.params,action.setSuccessSignup,action.setNotification)
      return{
        ...state
      }
    }

    
    
    default: {
      return { ...state };
    }
  }
};
