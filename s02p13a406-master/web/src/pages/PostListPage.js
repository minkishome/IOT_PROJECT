import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
import SearchContainer from '../containers/posts/SearchContainer';
import Footer from '../components/common/Footer';
import { Helmet } from 'react-helmet-async';

const PostListPage = () => {
  return (
    <>
      <Helmet>
        <title>게시판 - 소소하다</title>
      </Helmet>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
      <SearchContainer />
      <Footer />
    </>
  );
};

export default PostListPage;