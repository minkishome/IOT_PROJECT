import { createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,  // register, login
    key,  // m_id, pw, pwConfirm
    value,  // 실제 바꾸려는 값
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form);  // register login

export const register = createAction(REGISTER, ({ m_id, pw, name, email, location }) => ({
  m_id,
  pw,
  name,
  email,
  location
}));
export const login = createAction(LOGIN, ({ m_id, pw }) => ({
  m_id,
  pw,
}));

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState= {
  register: {
    m_id: '',
    pw: '',
    pwConfirm: '',
    name: '',
    email: '',
    location: '',
  },
  login: {
    m_id: '',
    pw: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;  // ex) state.register.m_id 을 바꾼다.
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload:auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
