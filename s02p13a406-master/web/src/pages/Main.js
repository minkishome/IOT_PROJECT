import React  from 'react';
import { Link } from 'react-router-dom';
import { AppBar, CssBaseline,  Toolbar, Typography,  Container, makeStyles,} from '@material-ui/core'
import { red, } from '@material-ui/core/colors'
// import { withTheme } from 'styled-components';
import class_video from './BackgroundVideo.module.css';
import Footer from '../components/common/Footer';
import MainCard from '../components/common/Card/main_card'
import Cardrightimage from '../components/common/Card/Cardrightimage';
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from 'react-helmet-async';


const BackgroundVideo=()=>{

  const videoSource="/Cows.mp4";

  return(
    <div className={class_video.Container}
      height='100%'  
    >

      <video autoPlay="autoplay" loop="loop" muted className={class_video.Video} >
     

        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.

     </video>

     <div className = {class_video.Content}
        style = {{
          color: '#f1f1f1',
          // width: '150px',
          // height: '300px',
          display: 'flex',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          // justifycontent: 'right',
          alignitems:' center',
          padding: 0,
        }}
     >
     
     <p style = {{
          position :'absolute',
          fontSize: '2.5vw',
          right:10
       }}>
         <br/>
         <br/>
         <br/>
         소를 위해 하나부터 열까지 다 해드립니다.
       </p>
    

     </div>

    </div>
  )
}

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: red[500],
    //   theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
    card: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      },
    cardbody: {
      height: 1,

    },
    mark_image: {
      position: 'absoulte',
      backgroundImage: 'url(/images/mark_image.jpg)',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',

    },

  },

}));




// export default function Pricing() {

const Main = () => {
  const classes = useStyles();

  return (
    <>
    <Helmet>
      <title>소소하다</title>
    </Helmet>
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to='/mypage'> 
            <img src='/images/mark_image.jpg' alt='' width='60' hegiht='60'/>
          </Link>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} component={Link} to='/mypage'>
            소소하다
          </Typography>
          <div id='carousel'/>

        
          {/* <Button  color="primary" variant="outlined" className={classes.link}> */}
          <Link variant="button" to='/login'> 시작하기 </Link>
          {/* </Button> */}
       
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <BackgroundVideo/>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary">
         소소하다 
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          더 편하고 건강하게 축사를 관리하세요
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          더 이상 시간에 구애받지 마세요
        </Typography>
      </Container>
      


      <Container maxWidth="md" component="main" className={classes.heroContent} >
        <Cardrightimage />
      </Container>
     
      {/* End hero unit */}
      <MainCard />
       {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
      
        <Footer/>
      </Container>
     
      {/* End footer */}
    </React.Fragment>
    </>
  );
}

export default Main;