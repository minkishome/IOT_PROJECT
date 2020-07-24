import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import { Helmet } from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
  margin-top: 8rem;
`;

const Head = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
  h3 {
    font-size: 1.8rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]};

  /* span 사이에 가운뎃점 문자 보여 주기 */
  span + span:before {
    color: ${palette.gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';  /* 가운뎃점 문자 */
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid ${palette.gray[2]};
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  // 에러 발생 시
  if (error) {
    if(error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다!</PostViewerBlock>
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>
  }

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return null;
  }
  
  const { title, content, m_id, regdate, viewcnt, replycnt } = post;

  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title} - 소소하다</title>
      </Helmet>
      <Head>
        <h1>{title} <small><small>[{replycnt}]</small></small></h1>
        <SubInfo>
          <span>
            <b>{m_id}</b>
          </span>
          <span>{new Date(regdate).toLocaleDateString()}</span>
          <span>{viewcnt}</span>
        </SubInfo>
      {actionButtons}
      </Head>
      <PostContent
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Head>
        <h3>댓글</h3>
      </Head>
    </PostViewerBlock>
  );
};

export default PostViewer;