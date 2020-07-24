import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null)
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value
      })
    )
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { m_id, pw } = form;
    if ([m_id, pw].includes('')) {
      setError('빈 칸을 모두 입력하세요')
      return;
    }
    dispatch(login({ m_id, pw }));
  };
  
  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch, error]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 403) {
        setError('존재하지 않는 아이디입니다.');
        return;
      }
      if (authError.response.status === 409) {
        setError('비밀번호를 확인해주세요.');
        return;
      }
      setError('로그인 실패');
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch, error]);

  useEffect(() => {
    if (user) {
      history.push('/mypage');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);
  
  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);