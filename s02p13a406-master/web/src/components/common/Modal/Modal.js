import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import './Modal.scss';
import {  ContactMail } from '@material-ui/icons';

const Modal = ({ isOpen, close }) => {
  return (
    <React.Fragment>
    {
      isOpen ?
      <React.Fragment>
        <div className="Modal-overlay" onClick={close} />
        <div className="Modal">
          <p className="title">These are Team Member</p>
          <Grid container className="content">
          <Grid
            item
            md ={3} xs ={12} sm ={6}
            style={{
              marginBottom: '30px',
            }}>
            <div style={{width:'100%',}}>
              <img src='/images/teamjang.jpg'
              alt = ''
              style = {{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                borderRadius: '10%'
              }}
              />    
              </div> 
              <h1 align='center' style={{color:'black'}} >오병관</h1>
              <Typography> 담당 : embedded </Typography>
              <Typography >  <ContactMail /> : qverck@gmail.com</Typography>
            </Grid>  
            <Grid
            item
            md ={3} xs ={12} sm ={6}
            style={{
              // flexDirection:'column',
              marginBottom: '30px',
              
            }}>
            <div style={{width:'100%',}}>
              <img src='/images/minkipark.jpg'
              alt = ''
              style = {{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                borderRadius: '10%'
              }}
              />    
            </div>  
            <h1 align='center' style={{color:'black'}}>박민기</h1>
              <Typography> 담당 : Front-end(React) </Typography>
              <Typography>  <ContactMail /> : minkishome@gmail.com</Typography>
            </Grid>
           
            <Grid
            item
            md ={3} xs ={12} sm ={6}
            style={{
              // flexDirection:'column',
              marginBottom: '30px',
            }}>
            <div style={{width:'100%',}}>
              <img src='/images/dong.jpg'
              alt = ''
              style = {{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                borderRadius: '10%'
              }}
              />
              </div> 
              <h1 align='center' style={{color:'black'}}>동명환</h1>
              <Typography> 담당 : back-end(Nodejs) </Typography>
              <Typography>  <ContactMail /> : v8392070@gmail.com</Typography>
            </Grid>
            <Grid
            item
            md ={3} xs ={12} sm ={6}
            style={{
              // flexDirection:'column',
              marginBottom: '30px',
            }}>
            <div style={{width:'100%',}}>
              <img src='/images/jw.jpg'
              alt = ''
              style = {{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                borderRadius: '10%'
              }}
              />    
              </div> 
              <h1 align='center' style={{color:'black'}}>허재웅</h1>
              <Typography> 담당 : Front-end(React)  </Typography>
              <Typography>  <ContactMail /> : koolerjaebee@gmail.com</Typography>
            </Grid>
        </Grid>
        </div>
      </React.Fragment>
      :
      null}
    </React.Fragment>
  )
}
export default Modal;