import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as replysAPI from '../lib/api/replys';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_REPLYS,
  LIST_REPLYS_SUCCESS,
  LIST_REPLYS_FAILURE,
] = createRequestActionTypes('replys/LIST_REPLYS');

export const listReplys = createAction(
  LIST_REPLYS,
  ({ bno }) => ({ bno }),
);

const listReplysSaga = createRequestSaga(LIST_REPLYS, replysAPI.listReplys);
export function* replysSaga() {
  yield takeLatest(LIST_REPLYS, listReplysSaga);
}

const initialState = {
  replys: null,
  error: null,
  bno: null,
};

const replys = handleActions(
  {
    [LIST_REPLYS_SUCCESS]: (state, { payload: replys, meta: response }) => ({
      ...state,
      replys,
      bno: parseInt(response.headers['bno'], 10),
    }),
    [LIST_REPLYS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default replys;