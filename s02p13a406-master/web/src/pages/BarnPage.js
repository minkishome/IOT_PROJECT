import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import BarnContainer from '../containers/barn/BarnContainer';
import Footer from '../components/common/Footer';
import { Helmet } from 'react-helmet-async';

const BarnPage = () =>{
    return (
      <>
      <Helmet>
        <title>내 축사 - 소소하다</title>
      </Helmet>
      <HeaderContainer />
      <BarnContainer />
      <Footer />
      </>
    );
};
export default BarnPage;