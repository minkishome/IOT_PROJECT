import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import WriteReply from './WriteReply';
import AskRemoveModal from './AskRemoveModal';

const ReplyListBlock = styled(Responsive)`
  margin-top: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const ReplyItemBlock = styled.div`
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

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

const IdButton = styled.button`
padding: 0.25rem 0.5rem;
border-radius: 4px;
color: ${palette.gray[0]};
background: ${palette.cyan[6]};
font-weight: bold;
border: none;
outline: none;
font-size: 1rem;
margin-right: 0.5rem;
`;

const ReplyItem = ({ id, reply, onEdit, onRemove, isAuthenticated, originalReplyId, onSubmit, replytext, onChangeField }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    onRemove(id);
    setModal(false);
  };

  return (
    <ReplyItemBlock>
      <IdButton>{reply["m_id"]}</IdButton>
      {isAuthenticated(id) &&
        <ActionButton onClick={() => onEdit(id)} >수정</ActionButton>
      }
      {isAuthenticated(id) &&
        <ActionButton onClick={onRemoveClick} >삭제</ActionButton>  
      }
      {originalReplyId === reply.rno ? <WriteReply replytext={replytext} onSubmit={e => onSubmit(e, id)} onChangeField={onChangeField} /> : <p>{reply.replytext}</p>}
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
        type="댓글"
      />
    </ReplyItemBlock>
  );
};

const Reply = ({ replys, loading, error, onEdit, onRemove, isAuthenticated, originalReplyId, onSubmit, replytext, onChangeField }) => {
  // 에러 발생 시
  if (error) {
    console.log(error)
  return <ReplyListBlock>에러가 발생했습니다. </ReplyListBlock>;
  }

  return (
    <ReplyListBlock>
      {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && replys && (
        <div>
          {replys.map((reply, index) => (
            <ReplyItem
              id={replys.indexOf(reply)}
              reply={reply}
              onEdit={onEdit}
              onRemove={onRemove}
              isAuthenticated={isAuthenticated}
              originalReplyId={originalReplyId}
              onSubmit={onSubmit}
              replytext={replytext}
              onChangeField={onChangeField}
              key={index}
            />
          ))}
        </div>
      )}
    </ReplyListBlock>
  );
};

export default Reply;