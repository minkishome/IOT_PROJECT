import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as barnAPI from '../lib/api/barn';
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

const INITIALIZE = 'barn/INITIALIZE';
const CHANGE_FIELD = 'barn/CHANGE_FIELD';
const [
  LIST_BARN_DATA,
  LIST_BARN_DATA_SUCCESS,
  LIST_BARN_DATA_FAILURE,
] = createRequestActionTypes('barn/LIST_BARN_DATA');

export const initialize = createAction(INITIALIZE);
export const listBarnData = createAction(
  LIST_BARN_DATA,
  ({ b_id, b_date }) => ({ b_id, b_date }),
);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}))

const listBarnDataSaga = createRequestSaga(LIST_BARN_DATA, barnAPI.listBarnData);
export function* barnSaga() {
  yield takeLatest(LIST_BARN_DATA, listBarnDataSaga);
}

const initialState = {
  barnData: null,
  error: null,
  b_date: today(),
  barnCount: null,
};

const barn = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value }}) => ({
      ...state,
      [key]: value,
    }),
    [LIST_BARN_DATA_SUCCESS]: (state, { payload: barnData, meta: response }) => ({
      ...state,
      barnData,
      barnCount: parseInt(response.headers['barn-cnt'], 10),
    }),
    [LIST_BARN_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default barn;