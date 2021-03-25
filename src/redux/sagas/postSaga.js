import {
    GET_HOST_POST_LIST, GET_ROOM_DETAIL
} from "../actions/post/action_type";

import actions from "../actions/post/index";

// saga effect
import {put, takeLatest, call, all, fork, select, takeEvery,delay} from 'redux-saga/effects'
import { getHostPostList, getRoomDetail } from "../../request";


function* getHostPostListSaga(action) {
    try {
      let response=[];  
      let setResponse=(res)=>{
          response=res
      }
      yield call(() => getHostPostList(setResponse));
      yield put(actions.getHostPostListSucceed(response));
    } catch (err) {
      console.log('err', err);
    }
  }

function* getRoomDetailSaga(action) {
  try {
    let response=[];  
    let setResponse=(res)=>{
        response=res
    }
    yield call(() => getRoomDetail(action.params,action.setLiked,setResponse));
    yield put(actions.getRoomDetailSucceed(response));
  } catch (err) {
    console.log('err', err);
  }
}



function* postSaga() {
    yield takeLatest(GET_HOST_POST_LIST, getHostPostListSaga);
    yield takeLatest(GET_ROOM_DETAIL,getRoomDetailSaga);
	
}

export default function *rootSaga() {
	yield all([fork(postSaga)]);
}
