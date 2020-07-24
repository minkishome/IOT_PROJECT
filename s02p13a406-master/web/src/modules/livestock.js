import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as livestockAPI from '../lib/api/livestock';
import { takeLatest } from 'redux-saga/effects';

const today = () => {
  var D = new Date();
  var dd = D.getDate();
  var mm = D.getMonth()+1; //January is 0!
  var yyyy = D.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }
  
  if(mm<10) {
      mm='0'+mm
  }
  return `${yyyy}-${mm}-${dd}`
}

const INITIALIZE = 'livestock/INITIALIZE';
const CHANGE_FIELD = 'livestock/CHANGE_FIELD';
const [
  LIST_LIVESTOCK_DATA,
  LIST_LIVESTOCK_DATA_SUCCESS,
  LIST_LIVESTOCK_DATA_FAILURE,
] = createRequestActionTypes('livestock/LIST_LIVESTOCK_DATA');

export const initialize = createAction(INITIALIZE);
export const listLivestockData = createAction(
  LIST_LIVESTOCK_DATA,
  ({ ls_id, ls_date }) => ({ ls_id, ls_date }),
);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}))

const listLivestockDataSaga = createRequestSaga(LIST_LIVESTOCK_DATA, livestockAPI.listLivestockData);
export function* livestockSaga() {
  yield takeLatest(LIST_LIVESTOCK_DATA, listLivestockDataSaga);
}

const initialState = {
  livestockData: null,
  error: null,
  ls_date: today(),
  livestockKinds: null,
};

const livestock = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value }}) => ({
      ...state,
      [key]: value,
    }),
    [LIST_LIVESTOCK_DATA_SUCCESS]: (state, { payload: livestockData, meta: response }) => ({
      ...state,
      livestockData,
      livestockKinds: response.headers['livestock-kinds'],
    }),
    [LIST_LIVESTOCK_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default livestock;