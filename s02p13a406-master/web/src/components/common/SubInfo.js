import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const SubInfoBlock = styled.div`
  ${props =>
    props.hasMarginTop &&
    css`
      margin-top: 0rem;
    `}
  color: ${palette.gray[6]};
  /* span 사이에 가운뎃점 문자 보여주기*/
  span + span:before {
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }
`;

const SubInfo = ({ m_id, regdate, hasMarginTop, viewcnt }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          {m_id}
        </b>
      </span>
      <span>{new Date(regdate).toLocaleDateString()}</span>
  <span>{viewcnt}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;