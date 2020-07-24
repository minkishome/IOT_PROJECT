import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import MyContainer from '../containers/my/MyContainer';
import Footer from '../components/common/Footer';
import { Helmet } from 'react-helmet-async';

const MyPage = () =>{
    return (
      <>
      <Helmet>
        <title>내 축사 - 소소하다</title>
      </Helmet>
      <HeaderContainer />
      <MyContainer />
      <Footer />
      </>
    );
};
export default MyPage;