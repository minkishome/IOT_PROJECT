import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import { Helmet } from 'react-helmet-async';


const WritePage = () =>{
  return (
    <Responsive>
      <Helmet>
        <title>글 작성하기 - 소소하다</title>
      </Helmet>
      <HeaderContainer />
      <EditorContainer />
      <WriteActionButtonsContainer />
      {/* <Footer /> */}
    </Responsive>
  );
};
export default WritePage;