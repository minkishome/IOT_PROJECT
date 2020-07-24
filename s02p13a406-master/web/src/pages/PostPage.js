import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import ReplyListContainer from '../containers/post/ReplyListContainer';
import WriteReplyContainer from '../containers/post/WriteReplyContainer';
import Footer from '../components/common/Footer';

const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostViewerContainer />
      <ReplyListContainer />
      <WriteReplyContainer />
      <Footer />
    </>
  );
};

export default PostPage;