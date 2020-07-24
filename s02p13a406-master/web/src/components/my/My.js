import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import BarnItemContainer from '../../containers/my/BarnItemContainer';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const MyBlock = styled(Responsive)`
  margin-top: 8rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const My = ({ barns, loading, error }) => {
  const classes = useStyles();
  // 에러 발생 시
  if (error) {
    console.log(error)
    return <MyBlock>에러가 발생했습니다. </MyBlock>;
  }

  return (
    <MyBlock>
      <h1>내 축사</h1>
      <Container maxWidth="md" component="main" className={classes.root}>
        {!loading && barns &&
          <Grid container spacing={10} alignItems="flex-start">
            {
              barns.map((barn, index) => (
                <Grid item  xs={12} sm={6} md={4} key={index} >
                  <BarnItemContainer barn={barn} key={index} />
                </Grid>
              ))
            }
          </Grid>
        }
      </Container>
    </MyBlock>
  );
};

export default My;