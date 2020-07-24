import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Livestock from '../../components/livestock/Livestock';
import { changeField, listLivestockData } from '../../modules/livestock';

const LivestockContainer = ({ match, location }) => {
  const dispatch = useDispatch();
  const { livestockData, ls_date, livestockKinds, error, loading } = useSelector(
    ({ livestock, loading }) => ({
      livestockData: livestock.livestockData,
      ls_date: livestock['ls_date'],
      livestockKinds: livestock.livestockKinds,
      error: livestock.error,
      loading: loading['livestock/LIST_LIVESTOCK_DATA'],
    }),
  );

  const calculateDay = (ls_date) => {
    var yyyy = ls_date.substr(0,4);
    var mm = ls_date.substr(5,2);
    var dd = ls_date.substr(8,2);

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
    onChangeField({ key: 'ls_date', value: calculateLsDay(date) })
  }

  useEffect(() => {
    const { ls_id } = match.params;
    dispatch(listLivestockData({ ls_id, ls_date }));
  }, [dispatch, location.search, ls_date]);

  if (!livestockData || loading) return null;

  return (
    <Livestock
      loading={loading}
      error={error}
      livestockData={livestockData}
      ls_date={calculateDay(ls_date)}
      onChangeDate={onChangeDate}
      livestockKinds={livestockKinds}
    />
  );
};

export default withRouter(LivestockContainer);