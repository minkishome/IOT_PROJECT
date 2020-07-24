import client from './client';

// 로그인
export const login = ({ m_id, pw }) =>
  client.post('/auth/login', {
    "m_id": m_id,
    "pw": pw
  });

// 회원가입
export const register = ({ m_id, pw, email, name, location }) =>
  client.post('/auth/join', {
    "m_id": m_id,
    "pw": pw,
    "name": name,
    "email": email,
    "location": location
  }); // 이메일, 이름, 위치

// 로그인 상태 확인
export const check = () => client.post('/auth/check');

// 로그아웃
export const logout = () => client.post('/auth/logout');

/*
  이메일: email
  이름: name
  위치: location
*/