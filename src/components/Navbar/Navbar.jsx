import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const TopNav = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Navbar.Brand href="#">
        <img className="d-inline-block align-top" src=""  alt=""/>
        Gulliver ore mi
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link>Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default TopNav;
