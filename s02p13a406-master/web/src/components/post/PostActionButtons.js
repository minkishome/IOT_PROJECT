import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
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

const PostActionButtons = ({ onEdit, onRemove, onList, isAuthenticated }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    onRemove();
    setModal(false);
  };

  return (
    <>
      <PostActionButtonsBlock>
        <ActionButton onClick={onList}>홈</ActionButton>
        {isAuthenticated() && <>
          <ActionButton onClick={onEdit}>수정</ActionButton>
          <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
          </>
        }
      </PostActionButtonsBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
        type="포스트"
      />
    </>
  );
};

export default PostActionButtons;