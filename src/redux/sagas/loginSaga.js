import {
     POST_TO_LOGIN
} from "../actions/login/action_type";

import actions from "../actions/login/index";

// saga effect
import {put, takeLatest, call, all, fork, select, takeEvery,delay} from 'redux-saga/effects'
import { postToLogin } from "../../request";


function* postToLoginSaga(action) {
  try {
    yield call(() => postToLogin(action.params,action.setLogged));
    yield put(actions.postToLoginSuccess());
  } catch (err) {
    console.log('err', err);
  }
}



function* loginSaga() {
    yield takeLatest(POST_TO_LOGIN, postToLoginSaga);
	
}

export default function *rootSaga() {
	yield all([fork(loginSaga)]);
}
