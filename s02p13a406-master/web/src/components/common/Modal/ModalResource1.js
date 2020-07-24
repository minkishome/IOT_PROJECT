import React from 'react';
import './Modal.scss';
import {Grid} from '@material-ui/core';



const ModalResource = ({ isOpen, close }) => {
  return (
    <React.Fragment>
    {
      isOpen ?
      <React.Fragment>
        <div className="Modal-overlay" onClick={close} />
        <div className="Modal_resource">
          {/* <div className="content"> */}
          <Grid style={{
              float: 'left',
              height: '50%',
              width: '50%',
            }}>
              <img src='/images/react_logo.png'
              alt = ''
              style = {{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
              />
            </Grid>
            <div style={{
              float: 'left',
              height: '50%',
              width: '50%',
            }}>
              <img src='/images/raspberry-pi-logo.png'
              alt = ''
              style = {{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
              />
            </div>
            <Grid style={{
              float: 'left',
              height: '50%',
              width: '50%',
            }}>
              <img src='/images/arduino_logo.png'
              alt = ''
              style = {{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
              />
            </Grid>
            <div style={{
              float: 'left',
              height: '50%',
              width: '50%',
            }}>
              <img src='/images/nodejs_logo.png'
              alt = ''
              style = {{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
              />
            </div>
              <Grid
              style={{
                height:'30%',
                width:'100%',
              }}
              >
                <img src='/images/red_bull.jpg'
              alt = ''
              style = {{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
              />
              </Grid>
          </div>
         
        {/* </div> */}
      </React.Fragment>
      :
      null}
    </React.Fragment>
  )
}
export default ModalResource;