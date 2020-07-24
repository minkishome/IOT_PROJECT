import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const PostSearchBlock = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 500px;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const PostTypeSelect = styled.select`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom : 0.5rem;
  margin-left : 0.5rem;
  margin-right : 0.5rem;
  outline: none;
`;

const StyledInput = styled.input`
  flex: 1;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom : 0.5rem;
  margin-left : 0.5rem;
  margin-right : 1rem;
  outline:none;
  &:focus{
      color:$oc-teal-7;
      border-bottom: 1px solid ${palette.gray[7]};
  }
`;

const Search = ({ searchKeyword, onChangeType, onChangeKeyword, onSubmit }) => {
  return (
  <PostSearchBlock>
    <form onSubmit={onSubmit}>
      <PostTypeSelect name="searchType" onChange={onChangeType}>
        <option value="all">전체</option>
        <option value="title_text">제목+내용</option>
        <option value="title">제목</option>
        <option value="text">내용</option>
        <option value="user">작성자</option>
      </PostTypeSelect>
      <StyledInput
        autoComplete="search"
        name="searchKeyword"
        placeHolder="검색하세요"
        onChange={onChangeKeyword}
        value={searchKeyword}
      />
      <Button>검색</Button>
    </form>
  </PostSearchBlock>
  )
}

export default Search;