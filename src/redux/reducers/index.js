import { combineReducers } from "redux";
import signup from './signupReducer';
import login from "./loginReducer";
import profile from "./profileReducer";
import post from "./postReducer";


const allReducers = combineReducers({
    signup,
    login,
    profile,
    post
});

export default allReducers;