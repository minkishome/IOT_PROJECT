import qs from 'qs';
import client from './client';

export const writeReply = ({ bno, replytext }) =>
  client.post('/reply/insert', {
    bno,
    replytext,
  });

export const listReplys = ({ bno }) => {
  const queryString = qs.stringify({
    bno,
  });
  return client.get(`/reply?${queryString}`);
};

export const updateReply = ({ rno, replytext }) =>
  client.put(`/reply/update/${rno}`, {
    replytext,
  });

export const removeReply = rno => client.delete(`/reply/del/${rno}`);