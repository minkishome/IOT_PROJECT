import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import { Link } from 'react-router-dom';

const PostListBlock = styled(Responsive)`
  margin-top: 8rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }
  p {
    margin-top: 0rem;
  }
`;

const PostItem = ({ post }) => {
  const { regdate, m_id, title, bno, viewcnt, replycnt } = post;
  return (
    <PostItemBlock>
      <h3>
        <Link to={`/posts/${bno}`}>{title} <small>[{replycnt}]</small></Link>
      </h3>
      <SubInfo
        m_id={m_id}
        regdate={new Date(regdate)}
        viewcnt={viewcnt}
      />
    </PostItemBlock>
  );
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
  // 에러 발생 시
  if (error) {
    console.log(error)
    return <PostListBlock>에러가 발생했습니다. </PostListBlock>;
  }

  return (
    <PostListBlock>
      <Link to="/posts">
        <h1>게시판</h1>
      </Link>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && posts && (
        <div>
          {posts.map(post => (
            <PostItem post={post} key={post.bno} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default PostList;