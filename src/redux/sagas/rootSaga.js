import { all } from 'redux-saga/effects'
import fileSaga from "./fileSaga";
import postSaga from "./postSaga";
import loginSaga from "./loginSaga";

export default function* rootSaga() {
	yield all([
		fileSaga(),
		postSaga(),
		loginSaga(),
	]);
}
