import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as questionsAPI from '../lib/api/questions';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_QUESTIONS,
  LIST_QUESTIONS_SUCCESS,
  LIST_QUESTIONS_FAILURE,
] = createRequestActionTypes('questions/LIST_QUESTIONS');

export const listQuestions = createAction(LIST_QUESTIONS);

const listQuestionsSaga = createRequestSaga(LIST_QUESTIONS, questionsAPI.listQuestions);
export function* questionsSaga() {
  yield takeLatest(LIST_QUESTIONS, listQuestionsSaga);
}

const initialState = {
  questions: null,
  error: null,
};

const quetions = handleActions(
  {
    [LIST_QUESTIONS_SUCCESS]: (state, { payload: questions }) => ({
      ...state,
      questions,
    }),
    [LIST_QUESTIONS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default quetions;