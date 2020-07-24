import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Barn from '../../components/barn/Barn';
import { changeField, listBarnData } from '../../modules/barn';

const BarnContainer = ({ match, location }) => {
  const dispatch = useDispatch();
  const { barnData, b_date, barnCount, error, loading } = useSelector(
    ({ barn, loading }) => ({
      barnData: barn.barnData,
      b_date: barn['b_date'],
      barnCount: barn.barnCount,
      error: barn.error,
      loading: loading['barn/LIST_BARN_DATA'],
    }),
  );

  const calculateDay = (b_date) => {
    var yyyy = b_date.substr(0,4);
    var mm = b_date.substr(5,2);
    var dd = b_date.substr(8,2);

    return new Date(yyyy, mm-1, dd);
  }

  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);

  const onChangeDate = (date) => {
    const calculateLsDay = (D) => {
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
    onChangeField({ key: 'b_date', value: calculateLsDay(date) })
  }

  useEffect(() => {
    const { b_id } = match.params;
    dispatch(listBarnData({ b_id, b_date }));
  }, [dispatch, b_date,]);

  if (!barnData || loading) return null;

  return (
    <Barn
      loading={loading}
      error={error}
      barnData={barnData}
      b_date={calculateDay(b_date)}
      onChangeDate={onChangeDate}
      barnCount={barnCount}
    />
  );
};

export default withRouter(BarnContainer);