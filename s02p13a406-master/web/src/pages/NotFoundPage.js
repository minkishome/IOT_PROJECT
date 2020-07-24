import React from 'react';
import Header from '../containers/common/HeaderContainer';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import Footer from '../components/common/Footer';
import { Helmet } from 'react-helmet-async';

const NotFoundBlock = styled(Responsive)`
  margin-top: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const NotFoundPage = () =>{
    return (
      <>
      <Helmet>
        <title>404 Not Found - 소소하다</title>
      </Helmet>
      <Header />
      <NotFoundBlock>
        <h1>404 Not Found</h1>
      </NotFoundBlock>
      <Footer />
      </>
    );
};
export default NotFoundPage;