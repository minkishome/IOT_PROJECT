import React from 'react';
import AskModal from '../common/AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel, type }) => {
  const title = `${type} 삭제`
  const description = `${type} 을/를 정말 삭제하시겠습니까?`
  return (
    <AskModal
      visible={visible}
      title={title}
      description={description}
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveModal;