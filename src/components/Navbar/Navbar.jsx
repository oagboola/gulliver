import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import UserContext from '../../contexts/UserContext';
import { FirebaseContext } from '../Firebase';
import Auth from '../../apis/auth';

const TopNav = () => {
  const firebase = useContext(FirebaseContext);
  const auth = new Auth(firebase);
  const user = useContext(UserContext);

  const handleClick = () => {
    auth.signOut();
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Navbar.Brand href="#">
        <img className="d-inline-block align-top" src=""  alt=""/>
        Gulliver ore mi
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          {user ?
            <>
              <Nav.Link>{user.displayName}</Nav.Link>
              <Nav.Link onClick={handleClick}>Sign out</Nav.Link>
            </> : ''
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default TopNav;
