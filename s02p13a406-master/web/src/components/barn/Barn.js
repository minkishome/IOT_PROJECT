import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import BarnChart from '../common/Chart/BarnChart';
import { Link } from 'react-router-dom';

const BarnBlock = styled(Responsive)`
  margin-top: 8rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const Barn = ({ barnData, b_date, onChangeDate, barnCount }) => {
  return (
    <BarnBlock>
      <h1>내 축사</h1>
      <Link to="/mypage">홈</Link>
      <h4>{barnCount}</h4>
      <BarnChart
        barnData={barnData}
        b_date={b_date}
        onChangeDate={onChangeDate}
      />
    </BarnBlock>
  );
};

export default Barn;