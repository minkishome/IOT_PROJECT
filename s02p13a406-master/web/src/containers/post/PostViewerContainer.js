import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = ({ match, history }) => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { bno } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    user: user.user
  }));

  useEffect(() => {
    dispatch(readPost(bno));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, bno]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(bno);
      history.push('/posts');
    } catch (e) {
      console.log(e);
    }
  };

  const onList = () => {
    history.push('/posts');
  };

  const isAuthenticated = () => {
    if (!user) return false;
    if (user["m_id"] === post["m_id"]) {
      return true;
    }
    return false;
  };

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} onList={onList} isAuthenticated={isAuthenticated}/>}
    />
  );
};

export default withRouter(PostViewerContainer);