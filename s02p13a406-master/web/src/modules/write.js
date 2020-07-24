import { createAction, handleActions } from 'redux-actions';
import createRequestSage, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE';  // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD';  // 특정 key 값 바꾸기
const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePost = createAction(WRITE_POST, ({ title, content }) => ({
  title,
  content,
}));
export const setOriginalPost =createAction(SET_ORIGINAL_POST, post => post);
export const updatePost = createAction(
  UPDATE_POST,
  ({ bno, title, content }) => ({
    bno,
    title,
    content,
  }),
);

// 사가 생성
const writePostSaga = createRequestSage(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSage(UPDATE_POST, postsAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
  title: '',
  content: '',
  post: null,
  postError: null,
  originalPostId: null,
};

const write = handleActions(
  {
    [INITIALIZE]: state => initialState,  // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,  // 특정 key 값을 업데이트
    }),
    [WRITE_POST]: state => ({
      ...state,
      // post와 postError를 초기화
      post: null,
      postError: null,
    }),
    // 포스트 작성 성공
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    // 포스트 작성 실패
    [WRITE_POST_FAILURE]: (state, { payload:postError }) => ({
      ...state,
      postError,
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      content: post.content,
      originalPostId: post.bno,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState,
);

export default write;