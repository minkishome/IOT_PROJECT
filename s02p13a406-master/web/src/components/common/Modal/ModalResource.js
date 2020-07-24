import React from 'react';
import './Modal.scss';
import {Grid, Container, Typography} from '@material-ui/core';



const ModalResource = ({ isOpen, close }) => {
  return (
    <React.Fragment>
    {
      isOpen ?
      <React.Fragment>
        <div className="Modal-overlay" onClick={close} />
        <div className="Modal">
          {/* <div className="content"> */}
          <Grid style = {{ height: '10%', width:'100%', alignItems:'center'}}>
            <Typography
              align="center"
              variant="h4"
              style={{
                color: 'rgb(245, 234, 233)',
              }}
              // style={{
              //   width: '40%',
              //   // hight: 'auto',
              //   display:'block',
              //   position:'absolute',
              //   textAlign: 'center',
              //   marginLeft:'30%',
              //   marginTop:'%',
              //   paddingTop:'30px',
              //   fontSize: '3rem'
              //   // margin: 'auto'
              // }}
            >
              소소하다
            </Typography>
          </Grid>
          <Container style={{ backgroundColor: 'rgb(245, 234, 233)', textAlign:'center'}}>
            <Grid style = {{ display: 'inline-block', height: '70%', width:'70%',  paddingTop:'10px', paddingBottom:'30px' }}>
              <Grid container style={{ height:'33%', width:'100%', flexDirection:'row',  }}>
                <Grid item md ={4} xs ={12} style={{ height:'33%', width:'33%', textAlign:'center'}}>
                  <img className="image_center" src='/images/logos/js.jpg' alt='logo' />
                </Grid>
                <Grid item md ={4} xs ={12} style={{ height:'33%', width:'33%', textAlign:'center' }}>
                  <img className="image_center" src='/images/logos/node_js.jpg' alt='logo' />
                </Grid>
                <Grid item md ={4} xs ={12} style={{ height:'33%', width:'33%', textAlign:'center' }}>
                  <img className="image_center" src='/images/logos/Raspbian.png' alt='logo' />
                </Grid>
              </Grid>
              <Grid container style={{ height:'33%', width:'100%', flexDirection:'row',   }}>
                <Grid item md ={4} xs ={12} style={{ height:'33%', width:'33%', textAlign:'center' }}>
                  <img className="image_center" src='/images/logos/css_html.png' alt='logo' />
                </Grid>
                <Grid item md ={4} xs ={12} style={{ height:'33%', width:'33%', textAlign:'center' }}>
                  <img className="image_center" src='/images/logos/mysql.png' alt='logo' />
                </Grid>
                <Grid item md ={4} xs ={12} style={{ height:'33%', width:'33%', textAlign:'center' }}>
                  <img className="image_center" src='/images/logos/react_logo.png' alt='logo' />
                </Grid>
              </Grid>
              <Grid container style={{ height:'33%', width:'100%', flexDirection:'row' }}>
                <Grid item md ={4} xs ={12} style={{ height:'33%', width:'33%', textAlign:'center' }}>
                  <img className="image_center" src='/images/logos/arduino_logo.png' alt='logo' />
                </Grid>
                <Grid item md ={4} xs ={12} style={{ height:'33%', width:'33%', textAlign:'center' }}>
                  <img className="image_center" src='/images/logos/redbull.png' alt='logo' />
                </Grid>
                <Grid item md ={4} xs ={12} style={{ height:'33%', width:'33%', textAlign:'center' }}>
                  <img className="image_center" src='/images/logos/wemake.png' alt='logo' />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
         
        {/* </div> */}
      </React.Fragment>
      :
      null}
    </React.Fragment>
  )
}
export default ModalResource;