import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as replysAPI from '../lib/api/replys';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'writeR/INITIALIZE';
const CHANGE_FIELD = 'writeR/CHANGE_FIELD';
const [
  WRITE_REPLY,
  WRITE_REPLY_SUCCESS,
  WRITE_REPLY_FAILURE,
] = createRequestActionTypes('writeR/WRITE_REPLY');
const SET_ORIGINAL_REPLY = 'writeR/SET_ORIGINAL_REPLY';
const [
  UPDATE_REPLY,
  UPDATE_REPLY_SUCCESS,
  UPDATE_REPLY_FAILURE,
] = createRequestActionTypes('writeR/UPDATE_REPLY');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writeReply = createAction(WRITE_REPLY, ({ bno, replytext }) =>({
  bno,
  replytext,
}))
export const setOriginalReply = createAction(SET_ORIGINAL_REPLY, reply => reply);
export const updateReply = createAction(
  UPDATE_REPLY,
  ({ rno, replytext }) => ({
    rno,
    replytext,
  })
)

const writeReplySaga = createRequestSaga(WRITE_REPLY, replysAPI.writeReply);
const updateReplySaga = createRequestSaga(UPDATE_REPLY, replysAPI.updateReply);

export function* writeRSaga() {
  yield takeLatest(WRITE_REPLY, writeReplySaga);
  yield takeLatest(UPDATE_REPLY, updateReplySaga);
}

const initialState = {
  replytext: '',
  reply: null,
  replyError: null,
  originalReplyId: null,
};

const writeR = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_REPLY]: state => ({
      ...state,
      reply: null,
      replyError: null,
    }),
    [WRITE_REPLY_SUCCESS]: (state, { payload: reply }) => ({
      ...state,
      reply,
    }),
    [WRITE_REPLY_FAILURE]: (state, { payload: replyError }) => ({
      ...state,
      replyError,
    }),
    [SET_ORIGINAL_REPLY]: (state, { payload: reply }) => ({
      ...state,
      replytext: reply.replytext,
      originalReplyId: reply.rno,
    }),
    [UPDATE_REPLY_SUCCESS]: (state, { payload: reply }) => ({
      ...state,
      reply,
    }),
    [UPDATE_REPLY_FAILURE]: (state, { payload: replyError }) => ({
      ...state,
      replyError,
    }),
  },
  initialState,
);

export default writeR;