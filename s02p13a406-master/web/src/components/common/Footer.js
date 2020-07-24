/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core';
import {Link, Grid, Typography,  Container,  } from '@material-ui/core';
import Modal from './Modal/Modal';
import ModalResource from './Modal/ModalResource';
import Termsofuse from './Modal/Termsofuse';



function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Currently v1.0.0 Released under the SSAFY Copyright © 2020. '}
        <Link color="inherit" href="https://instagram.com/minkishome">
          minkishome
        </Link>
        <br/>
        PHONE 
        <a href='tel:010-1234-5678'>
        : 010 - 1234 - 5678
        </a>
      </Typography>
        
    );
  }

const classes = makeStyles(theme=> ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(20),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        },
      },
}))


 
    class Footer extends Component {
      constructor(props){
        super(props);
        this.state = {
          isModalOpen: false,
          isModalsOpen: false,
          isModalOpenss:false,
        }
      }
      
      
      openModal = () => {
        this.setState({ isModalOpen: true });
      }
      
      closeModal = () => {
        this.setState({ isModalOpen: false }); 
      }
      openModals = () => {
        this.setState({ isModalOpens: true });
      }
      
      closeModals = () => {
        this.setState({ isModalOpens: false }); 
      }
      openModalterms = () => {
        this.setState({ isModalOpenss: true });
      }
      
      closeModalterms = () => {
        this.setState({ isModalOpenss: false }); 
      }
     
    render ()
    {
    
    const preventDefault = event => event.preventDefault();
    return (
        <React.Fragment>
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Grid container spacing={5} justify="space-evenly">
            {/* {footers.map(footer => ( */}
                <Grid item xs={3} sm={3} >
                  <Typography variant="h6" color="textPrimary" gutterBottom onClick={this.openModals}>              
                  <Link href="#" onClick={preventDefault} color="inherit">
                    {'Team'}
                  </Link>
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Typography variant="h6" color="textPrimary" gutterBottom onClick={this.openModal}>
                  <Link href="#" onClick={preventDefault} color="inherit">
                    {'Resource'}
                  </Link>
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Typography variant="h6" color="textPrimary" gutterBottom onClick={this.openModalterms}>
                  <Link href="#" onClick={preventDefault} color="inherit">
                    {'Terms'}
                  </Link>
                  </Typography>
                </Grid>
          {/* ))} */}
        </Grid>
        {/* <Box mt={5}> */}
          <Copyright/>
        {/* </Box> */}

      </Container>
      <Modal isOpen={this.state.isModalOpens} close={this.closeModals}/>
      <ModalResource isOpen={this.state.isModalOpen} close={this.closeModal}/>
      <Termsofuse isOpen={this.state.isModalOpenss} close={this.closeModalterms} />
      </React.Fragment>
    )
              }
}



export default Footer;