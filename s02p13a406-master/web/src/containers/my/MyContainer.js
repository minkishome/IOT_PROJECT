import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBarns } from '../../modules/barns';
import My from '../../components/my/My';

const MyContainer = () => {
  const dispatch = useDispatch()
  const { barns, error, loading, user } = useSelector(
    ({ barns, loading, user }) => ({
      barns: barns.barns,
      error: barns.error,
      loading: loading['barns/LIST_BARNS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(listBarns(user))
  }, [dispatch, user])

  return (
    <My
      loading={loading}
      error={error}
      barns={barns}
    />
  );
};

export default MyContainer;