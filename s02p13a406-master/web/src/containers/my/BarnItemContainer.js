import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listLivestocks } from '../../modules/livestocks';
import BarnItem from '../../components/my/BarnItem';

const BarnItemContainer = ({ barn }) => {
  const dispatch = useDispatch()
  const { livestocks, error, loading } = useSelector(
    ({ livestocks, loading }) => ({
      livestocks: livestocks.livestocks,
      error: livestocks.error,
      loading: loading['livestocks/LIST_LIVESTOCKS'],
    }),
  );

  useEffect(() => {
    dispatch(listLivestocks(barn));
  }, [barn, dispatch])

  return (
    <BarnItem
      b_id={barn["b_id"]}
      loading={loading}
      error={error}
      livestocks={livestocks}
    />
  );
};

export default BarnItemContainer;