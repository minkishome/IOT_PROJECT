import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value
      })
    )
  };
  
  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { m_id, pw, pwConfirm, name, email, location } = form;
    if ([m_id, pw, pwConfirm, name, email, location].includes('')) {
      setError('빈 칸을 모두 입력하세요')
      return;
    }
    if (pw !== pwConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      changeField({ form: 'register', key: 'pw', value: '' });
      changeField({ form: 'register', key: 'pwConfirm', value: ''});
      return;
    };
    dispatch(register({ m_id, pw, name, email, location }));
  };
  
  // 컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch, error]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      dispatch(check())
    }
  }, [auth, authError, dispatch, error])
  
  // user 값이 잘 성정되었는지 확인
  useEffect(() => {
    if (user) {
      console.log('check API 성공');
    }
  }, [user]);

  // user 값이 잘 설정되었는지 확인
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
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);