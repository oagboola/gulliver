import React from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

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
  return (
    <>
      <LoginContainer>
        <LoginTitle>Welcome to Gulliver Notes</LoginTitle>
        <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Email" />
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="password" />
            </Form.Group>
            <Button type="submit" variant="outline-primary">Login</Button>
        </Form>
      </LoginContainer>
    </>
  )
}

export default Login;
