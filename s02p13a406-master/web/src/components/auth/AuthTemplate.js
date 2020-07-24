import React from 'react';
// import styled from 'styled-components';
import palette from '../../lib/styles/palette';
// import { Link } from 'react-router-dom';
import { Grid, makeStyles, Typography,   } from '@material-ui/core';
import Header from '../common/Header'
// import Footer from '../common/Footer';
import { grey }from '@material-ui/core/colors/'


// const AuthTemplateBlock = styled.div`
// //   position: absolute;
//   left: 0;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   background: ${palette.gray[2]};
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
  
// `;

// const WhiteBox = styled.div`
//   .logo-area {
//     display: block;
//     padding-bottom: 2rem;
//     text-align: center;
//     font-weight: bold;
//     letter-spacing: 2px;
//   }
//   box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
//   height: 100%;
  
  
//   background: white;
//   border-radius: 2px;
  
  
// `;


const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: grey[200], 
    //   theme.palette.background.default,
      height: '100%',

  },
    grid: {
      height: '100vh',
      
    },
      // width: '100vh'
    
    quoteContainer: {
    //   backgroundImage: 'url(/images/auth.jpg)',   
      // display: fixed,
      // position:'relative',
      // flexDirection: 'row',
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },

    quoteText: {
        color: palette.white,
        fontWeight: 150
    },
    quote: {
      backgroundColor: theme.palette.neutral,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(/images/cows.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    },
    quoteInner: {
      textAlign: 'center',
      flexBasis: '600px'
    },
   
    name: {
      marginTop: theme.spacing(3),
      color: theme.palette.white
    },
    bio: {
      color: theme.palette.white
    },
    contentContainer: {
      
  },
    content: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      // flexDirection: 'row',  
      // backgroundImage: 'url(/images/plain.jpeg)',
      
    },
    contentHeader: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: theme.spacing(10),
      paddingBototm: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    logoImage: {
      marginLeft: theme.spacing(4)
    },
    contentBody: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      marginLeft: '20px',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center'
      }
    },
    form: {
      paddingLeft: 100,
      paddingRight: 100,
      paddingBottom: 125,
      flexBasis: 700,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
      }
    },
    title: {
      marginTop: theme.spacing(3)
    },
    socialButtons: {
      marginTop: theme.spacing(3)
    },
    socialIcon: {
      marginRight: theme.spacing(1)
    },
    sugestion: {
      marginTop: theme.spacing(2)
    },
    textField: {
      marginTop: theme.spacing(2)
    },
    signInButton: {
      margin: theme.spacing(2, 0)
    },
    // footer:{
    //   padding: 0 + '!important',
    //   marginTop : 0 + '!important'
    // }
  }));


const AuthTemplate = ({ children }) => {
    
    const classes = useStyles();
  return (
    <div className={classes.root} >
        
        {/* <AuthTemplateBlock> */}
        <Header/>
            <Grid 
                className={classes.grid}
                container
            >
                <Grid
                    className={classes.quoteContainer}    
                    item
                    lg={6}
                >
                    <Grid className={classes.quote}>
                      <div className={classes.quoteInner}>
                        <Typography
                        className={classes.quoteText}
                        variant="h3"
                        >
                        life with Cow
                        </Typography>
                      </div>
                    </Grid>
                </Grid>
                <Grid
                    className={classes.content}
                    item 
                    lg={6}
                    xs={12}
                >
                    <div className={classes.content}>
                        {/* <div className={classes.contentHeader}>
                        <IconButton  >
                          <ArrowBackIcon>           
                          </ArrowBackIcon>
                        </IconButton>  
                        </div>  */}
                        <div className={classes.contentBody} >
                          {children}
                        </div>
                    </div>
                </Grid>
            </Grid>
        {/* </AuthTemplateBlock> */}


               
    </div>
  );
};

export default AuthTemplate;
