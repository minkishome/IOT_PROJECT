import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as barnAPI from '../lib/api/barn';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'barns/INITIALIZE';
const CHANGE_FIELD = 'barns/CHANGE_FIELD';
const [
  LIST_BARNS,
  LIST_BARNS_SUCCESS,
  LIST_BARNS_FAILURE,
] = createRequestActionTypes('barns/LIST_BARNS');

export const initialize = createAction(INITIALIZE);
export const listBarns = createAction(
  LIST_BARNS,
  ({ m_id }) => ({ m_id }),
);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) =>({
  key,
  value,
}))

const listBarnsSaga = createRequestSaga(LIST_BARNS, barnAPI.listBarnId);
export function* barnsSaga() {
  yield takeLatest(LIST_BARNS, listBarnsSaga);
}

const initialState = {
  barns: null,
  error: null,
};

const barns = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value }}) => ({
      ...state,
      [key]: value,
    }),
    [LIST_BARNS_SUCCESS]: (state, { payload: barns }) => ({
      ...state,
      barns,
    }),
    [LIST_BARNS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default barns;