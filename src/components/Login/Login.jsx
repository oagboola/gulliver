import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import { FirebaseContext } from '../Firebase';
import Auth from '../../apis/auth';

const LoginContainer = styled.div`
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  margin-top: 50%;
`
const LoginTitle = styled.p`
  font-weight: bold;
  text-align: center;
  padding: 10px;
  height: auto;
`;

const Login = () => {
  const Firebase = useContext(FirebaseContext)
  const auth = new Auth(Firebase);
  const [isLogin, setIsLogin] = useState(true);
  const [creds, setCreds] = useState({});
  const handleClick = () => {
    const loginState = isLogin;
    setIsLogin(!loginState);
  }
  const handleLogin = (e) => {
    e.preventDefault();
    auth.localSignIn(creds);
  }
  const handleSignup = (e) => {
    e.preventDefault();
    auth.localSignup(creds);
  }
  const handleChange = (e, fieldName) => {
    const x = creds;
    x[fieldName] = e.target.value;
    setCreds(x);
  }

  return (
    <>
      <LoginContainer>
        <LoginTitle>Welcome to Gulliver Notes</LoginTitle>
        <Form>
            <Form.Group>
              <Form.Control type="email" placeholder="Email" name="email" value={creds.email} onChange={(e) => handleChange(e, 'email')}/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="password" name="password" value={creds.password} onChange={(e) => handleChange(e, 'password')}/>
            </Form.Group>
            { isLogin ?
              <>
                <Button type="submit" variant="outline-primary" onClick={handleLogin}>Login</Button>
                <p onClick={handleClick}>New user? SignUp</p>
              </>:
              <>
                <Button type="submit" variant="outline-primary" onClick={handleSignup}>SignUp</Button>
                <p onClick={handleClick}>Got an account already? Log in</p>
              </>
            }
        </Form>
      </LoginContainer>
    </>
  )
}

export default Login;
