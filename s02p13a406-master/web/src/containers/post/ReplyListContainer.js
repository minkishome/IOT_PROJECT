import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReplyList from '../../components/post/ReplyList';
import { listReplys } from '../../modules/replys';
import { setOriginalReply, updateReply, initialize } from '../../modules/writeR';
import { removeReply } from '../../lib/api/replys';
import { changeField } from '../../modules/writeR';

const ReplyListContainer = ({ match }) => {
  const dispatch = useDispatch();
  const { bno } = match.params;
  const { replys, error, loading, reply, replytext, originalReplyId, user } = useSelector(
    ({ replys, loading, writeR, user }) => ({
      replys: replys.replys,
      error: replys.error,
      loading: loading['replys/LIST_Replys'],
      reply: writeR.reply,
      replytext: writeR.replytext,
      originalReplyId: writeR.originalReplyId,
      user: user.user
    }),
  );

  const [isDeleted, setIsDeleted] = useState(false);

  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);

  useEffect(() => {
    dispatch(listReplys({ bno }));
    setIsDeleted(false);
  }, [bno, dispatch, reply, isDeleted])

  const onEdit = id => {
    dispatch(setOriginalReply(replys[id]));
  };
  
  const onSubmit = (e, id) => {
    e.preventDefault();
    dispatch(updateReply({ rno: replys[id].rno, replytext }));
    dispatch(initialize());
  }

  const onRemove = async id => {
    try {
      await removeReply(replys[id].rno);
      setIsDeleted(true);
    } catch (e) {
      console.log(e);
    }
  };

  const isAuthenticated = id => {
    if (!user) return false;
    if (user["m_id"] === replys[id]["m_id"]) {
      return true;
    }
    return false;
  };

  return (
    <ReplyList
      loading={loading}
      error={error}
      replys={replys}
      onEdit={onEdit}
      onRemove={onRemove}
      isAuthenticated={isAuthenticated}
      originalReplyId={originalReplyId}
      onSubmit={onSubmit}
      replytext={replytext}
      onChangeField={onChangeField}
    />
  );
};

export default withRouter(ReplyListContainer);