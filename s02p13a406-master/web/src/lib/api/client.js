import axios from 'axios';

const client = axios.create({
  // baseURL: "http://52.78.51.114:3001/",
  // withCredentials: true,
});
/*
  글로벌 설정 예시
  // API 주소를 다른 곳으로 사용함
  client.defaults.baseURL = 'https://external-api-server.com/

  // 헤더 설정
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

  // 인터셉터 설정
  axios.intercepter.response.user(\
    response => {
      // 요청 성공 시 특정 작업 수행
      return response;
    },
    error => {
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error)
    }
  })
*/

export default client;