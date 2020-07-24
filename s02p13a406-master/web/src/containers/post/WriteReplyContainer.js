import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import WriteReply from '../../components/post/WriteReply';
import { useDispatch, useSelector } from 'react-redux';
import { initialize, writeReply, changeField } from '../../modules/writeR';

const WriteReplyContainer = ({ match }) => {
  const dispatch = useDispatch();
  const { bno } = match.params;
  const { replytext, originalReplyId } = useSelector(({ writeR }) => ({
    replytext: writeR.replytext,
    originalReplyId: writeR.originalReplyId,
  }));
  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);
  
  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);
  
  const onSubmit = e => {
    e.preventDefault();
    dispatch(writeReply({ bno, replytext }));
    dispatch(initialize());
  };

  if (originalReplyId) {
    return (<></>)
  }
   
  return (
    <WriteReply
      replytext={replytext}
      onSubmit={onSubmit}
      onChangeField={onChangeField}
    />
  );
};

export default withRouter(WriteReplyContainer);