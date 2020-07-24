import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as livestockAPI from '../lib/api/livestock';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'livestocks/INITIALIZE';
const CHANGE_FIELD = 'livestocks/CHANGE_FIELD';
const [
  LIST_LIVESTOCKS,
  LIST_LIVESTOCKS_SUCCESS,
  LIST_LIVESTOCKS_FAILURE,
] = createRequestActionTypes('livestocks/LIST_LIVESTOCKS');

export const initialize = createAction(INITIALIZE);
export const listLivestocks = createAction(
  LIST_LIVESTOCKS,
  ({ b_id }) => ({ b_id }),
);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) =>({
  key,
  value,
}))

const listLivestocksSaga = createRequestSaga(LIST_LIVESTOCKS, livestockAPI.listLivestockId);
export function* livestocksSaga() {
  yield takeLatest(LIST_LIVESTOCKS, listLivestocksSaga);
}

const initialState = {
  livestocks: null,
  error: null,
};

const livestocks = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value }}) => ({
      ...state,
      [key]: value,
    }),
    [LIST_LIVESTOCKS_SUCCESS]: (state, { payload: livestocks }) => ({
      ...state,
      livestocks,
    }),
    [LIST_LIVESTOCKS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default livestocks;