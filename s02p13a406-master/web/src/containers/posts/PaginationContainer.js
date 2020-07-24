import React from 'react';
import Pagination from '../../components/posts/Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location }) => {
  var { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));

  const buildLink = ({ page, searchKeyword, searchType }) => {
    const query = qs.stringify({ page, searchKeyword, searchType });
    return `/posts?${query}`;
  };

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!posts || loading) return null;

  // page가 없으면 1을 기본값으로 사용
  const { page = 1, searchKeyword = null, searchType = "all" } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  
  return (
    <Pagination
      page={parseInt(page, 10)}
      lastPage={lastPage}
      searchKeyword={searchKeyword}
      searchType={searchType}
      buildLink={buildLink}
    />
  );
};

export default withRouter(PaginationContainer);