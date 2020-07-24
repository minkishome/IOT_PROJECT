import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Container, Grid} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems:'center',
      
    },
  },
  details: {

    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 400,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },

  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },

}));

const Cardrightimage = () => {
  
    
    const classes = useStyles();
//item  xs={6} sm={6} md={6} alignItems="flex-end"  

  return (
    <Container maxWidth = 'md'  display="flex" flexdirection="column" alignitems='center'>
        <Grid container align = 'center'  spacing = {5}>
          <Grid item style={{width:'inherit'}}>
              <Card className={classes.root} md ={6} xs ={6} >
              <div className={classes.details}>
                  <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                      더 편하게 관리하세요
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                  '소소하다'와 고객님이 쌓아온 경험을 합친다면 더 높은 효율로 축사를 운용해 더 높은 이윤을 기록할 수 있습니다.
                  </Typography>
                  </CardContent>
                  
              </div>
              <CardMedia
                className={classes.cover}
                image={require('../../../pages/card_image/cow_with_person.jpg')}

              />
              </Card>
          </Grid>
            <Grid item style={{width:'inherit'}}> 
              <Card className={classes.root}>
              <div className={classes.details}>
                  <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                  가축을 보호해드립니다
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                  실시간 감지, 각 개체별 정보 획득과 축적된 데이터를 활용해 노동 시간을 줄이고 이윤은 높이는 효율적 관리를 제공합니다.
                  </Typography>
                  </CardContent>
                
              </div>
              <CardMedia
                  className={classes.cover}
                  image={require('../../../pages/card_image/protect_cow.jpg')}
              />
              </Card>
          </Grid>
      </Grid>
    </Container>
  );
}

export default Cardrightimage;