import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import questions, { questionsSaga } from './questions';
import replys, { replysSaga } from './replys';
import writeR, { writeRSaga } from './writeR';
import barn, { barnSaga } from './barn'
import barns, { barnsSaga } from './barns';
import livestock, { livestockSaga } from './livestock'
import livestocks, { livestocksSaga } from './livestocks';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    write,
    post,
    posts,
    questions,
    replys,
    writeR,
    barn,
    barns,
    livestock,
    livestocks,
});

export function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        writeSaga(),
        postSaga(),
        postsSaga(),
        questionsSaga(),
        replysSaga(),
        writeRSaga(),
        barnSaga(),
        barnsSaga(),
        livestockSaga(),
        livestocksSaga(),
    ]);
}

export default rootReducer;