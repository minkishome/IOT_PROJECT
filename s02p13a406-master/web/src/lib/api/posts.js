import qs from 'qs';
import client from './client';

export const writePost = ({ title, content }) =>
  client.post('/board/insert', {
    "title": title,
    "content": content
  });

export const readPost = bno => {
  client.put(`/board/vcnt/${bno}`)
  return client.get(`/board/${bno}`)
}

export const listPosts = ({ page, searchKeyword, searchType }) => {
  const queryString = qs.stringify({
    page,
    searchKeyword,
    searchType
  });
  return client.get(`/board?${queryString}`);
};

export const updatePost = ({ bno, title, content }) =>
  client.put(`/board/update/${bno}`, {
    "title": title,
    "content": content
  });

export const removePost = bno => client.delete(`/board/del/${bno}`);