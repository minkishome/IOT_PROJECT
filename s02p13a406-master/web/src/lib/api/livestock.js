import qs from 'qs';
import client from './client';

export const listLivestockData = ({ ls_id, ls_date }) => {
  const queryString = qs.stringify({
    ls_date,
  });
  return client.get(`/livestock/${ls_id}?${queryString}`);
};

export const listLivestockId = ({ b_id }) =>
  client.get(`/livestock/barn/${b_id}`);