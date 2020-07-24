import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { makeStyles, Typography } from '@material-ui/core';
import {blue} from '@material-ui/core/colors'
import { AccountCircle, VpnKey, Email, Explore, EmojiPeople} from "@material-ui/icons"

// 스타일링 된 input
const StyledInput = styled.input`
    background-color: ${palette.gray[1]};
    font-size:1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom : 0.5rem;
    outline:none;
    width: 100%;
    &:focus{
        color:$oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
        
    }
`;
const Footer = styled.div`
    margin-top:2rem;
    text-align:right;
    {
        color:${palette.gray[6]};
        text-decoration:underline;
        &:hover {
            color:${palette.gray[9]}
        }
    }
`
const textmap={
    login: '로그인',
    register: '회원가입',
};

const ButtonWithMarginTop = styled(Button)`
    margin-top: 1rem;
    
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const useStyles = makeStyles(theme => ({
    quote: {
        backgroundImage: 'url(/cow/auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    root:{
        height: '100%'
    },
    grid:{
        height:'100%'
    },
    contentBody: {
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
            flexGrow: 1,
            display: 'flex',    
            alignItems: 'center',
            width:'50%',

          },
        flexGrow: 1,
        display: 'flex',    
        alignItems: 'center',
        width:'50%'
        
    },
    footer: {
        backgroundColor: blue[50]
    },
    container:{
        flex : '1',
        flexDiretion : 'row'
    },

    
 }))

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
    const classes = useStyles();
    const text = textmap[type];
    return (
            <div className={classes.contentBody}>
                <form 
                    onSubmit={onSubmit}
                >
                    <h3>{text}</h3>
                    

                        <AccountCircle/>
                        <StyledInput 
                            autoComplete="username" 
                            name="m_id" 
                            placeholder="아이디"
                            onChange={onChange}
                            value={form.m_id}
                        />
                        <VpnKey/>
                        <StyledInput 
                            autoComplete="new-password" 
                            name="pw" 
                            placeholder="비밀번호" 
                            type="password"
                            onChange={onChange}
                            value={form.pw}
                        />
                        
                        
                        {type === 'register' && (
                        <div>
                            <VpnKey/>
                          <StyledInput
                            autoComplete="new-password"
                            name="pwConfirm"
                            placeholder="비밀번호 확인"
                            type="password"
                            onChange={onChange}
                            value={form.pwConfirm}
                          />
                          </div>
                        )}
                        
                        {type === 'register' && (
                        <div>
                        <EmojiPeople/>
                          <StyledInput
                            autoComplete="name"
                            name="name"
                            placeholder="이름"
                            onChange={onChange}
                            value={form.name}
                          />
                        </div>
                        )}
                        
                        {type === 'register' && (
                        <div>
                        <Email/>
                          <StyledInput
                            autoComplete="email"
                            name="email"
                            placeholder="이메일"
                            type="email"
                            onChange= {onChange}
                            value={form.email}
                          />
                          </div>
                        )}
                        

                        {type === 'register' && (
                        <div>
                        <Explore/>
                          <StyledInput
                            autoComplete="location"
                            name="location"
                            placeholder="위치"
                            onChange={onChange}
                            value={form.location}
                          />
                        </div>
                        )}
                        {error && <ErrorMessage>{error}</ErrorMessage>}

                        <ButtonWithMarginTop
                        cyan 
                        fullWidth
                        // width = '100%' 
                        style={{marginTop: '1rem'}}>
                            {text}
                        </ButtonWithMarginTop>
                        <Footer>
                            {type === 'login' ? (   
                                <Typography
                                    variant="h6"
                                >
                                 <Link to='/register'>회원가입</Link>
                                </Typography>
                            ) : (
                                <Typography
                                    variant='h6'
                                >
                                <Link to='/login' >로그인</Link>
                                </Typography>
                            )}
                        </Footer>
                    </form>
                      
            </div>
    );
                            };

export default AuthForm;
