import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuestionList from '../../components/questions/QuestionList';
import { listQuestions } from '../../modules/questions';

const QuestionListContainer = () => {
  const dispatch = useDispatch()
  const { questions, error, loading } = useSelector(
    ({ questions, loading }) => ({
      questions: questions.questions,
      error: questions.error,
      loading: loading['questions/LIST_QUESTIONS'],
    }),
  );
  useEffect(() => {
    dispatch(listQuestions());
  }, [dispatch])

  return (
    <QuestionList
      loading={loading}
      error={error}
      questions={questions}
    />
  );
};

export default withRouter(QuestionListContainer);