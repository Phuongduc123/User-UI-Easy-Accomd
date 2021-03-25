import {
} from "../actions/signup/action_type";

import actions from "../actions/signup/index";

// saga effect
import {put, takeLatest, call, all, fork, select, takeEvery,delay} from 'redux-saga/effects'




function* fileSaga() {
	
	
}

export default function *rootSaga() {
	yield all([fork(fileSaga)]);
}
