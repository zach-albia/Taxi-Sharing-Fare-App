/* global fetch */

import es6promise from "es6-promise";
import "isomorphic-unfetch";
import { all } from "redux-saga/effects";

es6promise.polyfill();

function* rootSaga() {
  yield all([]);
}

export default rootSaga;
