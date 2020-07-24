import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

import LivestockChart from '../common/Chart/LivestockChart';
import { Link } from 'react-router-dom';

const LivestockBlock = styled(Responsive)`
  margin-top: 8rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const Livestock = ({ livestockData, ls_date, onChangeDate, livestockKinds }) => {
  return (
    <LivestockBlock>
      <h1>내 가축</h1>
      <Link to="/mypage">홈</Link>
      <h4>{livestockKinds}</h4>
      <LivestockChart
        livestockData={livestockData}
        ls_date={ls_date}
        onChangeDate={onChangeDate}
      />
    </LivestockBlock>
  );
};

export default Livestock;