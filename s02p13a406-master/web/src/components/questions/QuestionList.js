import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const QuestionListBlock = styled(Responsive)`
  margin-top: 8rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
    margin-bottom: 2rem;
  }
`;

const QuestionItemBlock = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin: 0rem;
  }
`;

const QuestionItem = ({ question }) => {
  const { title, content } = question;
  return (
    <QuestionItemBlock>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <p><b>{title}</b></p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <p>{content}</p>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </QuestionItemBlock>
  );
};

const QuestionList = ({ questions, loading, error }) => {
  // 에러 발생 시
  if (error) {
    return <QuestionListBlock>에러가 발생했습니다.</QuestionListBlock>;
  }

  return (
    <QuestionListBlock>
    <h1>FAQ</h1>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && questions && (
        <div>
          {questions.map((question, index) => (
            <QuestionItem question={question} key={index} />
          ))}
        </div>
      )}
    </QuestionListBlock>
  );
};

export default QuestionList;